angular.module('workoutApp')
  .controller('newUserCtrl', function($firebaseArray, $location, firebaseUrl, Auth) {

    var self = this;

    this.currentUser = Auth.getCurrentUser()
    var users = firebaseUrl + 'users/' + self.currentUser.$id
    var userRef = new Firebase(users)

    var records = firebaseUrl + 'records/' + self.currentUser.$id
    var recordsRef = new Firebase(records)

    this.setChoice = function() {
      userRef.update({
        newUser: false
      })
      return $location.path('/')
    }
    this.begin = function () {
      recordsRef.update({
            Bench_Press: 60,
            Squat: 40,
            Barbell_Curl: 25,
            Military_Press: 20,
          })
    }
    this.int = function () {
      recordsRef.update({
            Bench_Press: 70,
            Squat: 50,
            Barbell_Curl: 35,
            Military_Press: 35,
          })
    }
    this.advanced = function () {
      recordsRef.update({
            Bench_Press: 70,
            Squat: 65,
            Barbell_Curl: 55,
            Military_Press: 60,
          })
    }
    this.exp = function () {
      recordsRef.update({
            Bench_Press: 90,
            Squat: 110,
            Barbell_Curl: 75,
            Military_Press: 80,
          })
        }
  })
