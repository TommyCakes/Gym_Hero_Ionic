'use strict';


angular.module('workoutApp')
  .factory('Auth', function($firebase, firebaseUrl, $firebaseObject, $firebaseArray, $location, $stateParams, $state) {

    var ref = new Firebase(firebaseUrl)
    var authData = ref.getAuth();
    var currentUser = {};
    console.log(authData)

    //Welcome messages, morn, noon and night
    var self = this;
    var date = new Date();
    var time = date.getHours()
    if (time < 12) {
      self.morn = true;
    }
    else if (time >= 12 && time >= 16) {
      self.morn = false;
      self.afternoon = true;
    }
    else {
      self.morn = false;
      self.afternoon = false;
      self.eve = true;
    }
    //Get user login

    return {
      login: function () {
        //redirect
        ref.authWithOAuthPopup("twitter", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
              Materialize.toast('Error logging in', 2000 , 'center')
          }
          else {
            console.log("Authenticated successfully with payload:", authData);
            if (self.morn == true) {
              Materialize.toast('Good Morning!' , 2000);
            } else if (self.afternoon = true) {
                Materialize.toast('Good Afternoon!' , 2000);
            } else {
              Materialize.toast('Good Evening you have Sucessfully Logged In!' , 2000);
            }
          }
        });
          // console.log("your id is number: " + self.uid);
      },
      //logout function
      logout: function () {
        ref.unauth()
        console.log('Logged Out!')
          Materialize.toast('You have Logged Out' , 2000)
      },
      onAuth: function (cb) {
        ref.onAuth(function(data) {
          cb(updateUser(data))
        })
      },
      getCurrentUser: function() {
        return currentUser
      }
  }
  //Making sure current user is updated
  function updateUser (userData) {
    if (userData === null) {
      return false
      console.log(self.new)
    }
      var records = ref.child('records').child(userData.uid)
      records.on('value', function(snapshot) {
        if (snapshot.exists() === false) {
          records.update({
            Bench_Press: 60,
            Squat: 50,
            Barbell_Curl: 25,
          })
          console.log("first time records")
        }
      });

    var user = ref.child('users').child(userData.uid)
      user.update({
      uid: userData.uid,
      displayName: userData.twitter.displayName,
      picture: userData.twitter.profileImageURL,
      twitterObj: userData.twitter
    })
    user = $firebaseObject(user)
    currentUser = user
    return user;
  }
})
