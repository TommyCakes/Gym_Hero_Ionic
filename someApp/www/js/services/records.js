'use strict';

angular.module('workoutApp')
  .factory('Records', function($firebase, firebaseUrl, $firebaseObject, $firebaseArray, Auth) {

    var self = this;

    this.currentUser = Auth.getCurrentUser()
    console.log(self.currentUser)

    var records = firebaseUrl + 'records/' + self.currentUser.$id
    var recordsRef = new Firebase(records)
    var recordsObj = $firebaseObject(recordsRef)

    console.log(records)

    return {

      userData: function (name, newValue) {
        var weight = parseInt(newValue)
        recordsRef.child(name).set(weight);
      }
    }
})
