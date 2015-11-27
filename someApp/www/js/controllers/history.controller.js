'use strict';

angular.module('workoutApp')
  .controller('HistoryCtrl', function(Auth, $firebaseObject, firebaseUrl, $firebaseArray) {

    var userMoves = firebaseUrl + 'movements/' + Auth.getCurrentUser()
    console.log(Auth.getCurrentUser())
    console.log(self.userMoves)

    //test
  });
