'use strict';


angular.module('workoutApp')
  .controller('HomeCtrl', function($firebaseObject, $firebaseArray, $location, firebaseUrl, Auth,  $stateParams, $state ){
     var self = this;


    this.fireLink = firebaseUrl;
    var ref = new Firebase(firebaseUrl)

    var users = firebaseUrl + 'users'
    var userRef = new Firebase(users)
    this.users = $firebaseArray(userRef)

    //Calling login function
    this.login = function() {
      self.loading = true;
      // self.complete = true;
      Auth.login();
      console.log(Auth.updateUser)
      console.log(self.complete)

    }

    Auth.onAuth(function(user) {
      self.user = user
      // self.new = true

      self.loading = false;
      // self.complete = true;
        console.log(self.complete)

      if (user === false) {
        // self.new = false;
        return $location.path('/signIn')
      }
      // else {
      //   self.user.$loaded().then(function(data) {
      //       var userData = data;
      //       console.log(data)
      //     if (userData.newUser !== false) {
      //         return $location.path('/home')
      //     }
          else {
            return $state.go('/tab.home')
          }
        })
      // }
    })
    this.logout = Auth.logout
    // console.log(self.users)
// })
