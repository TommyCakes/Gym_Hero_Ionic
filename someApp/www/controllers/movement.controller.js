'use strict';


angular.module('workoutApp')
.controller('MoveCtrl', function($firebaseObject, $firebaseArray, firebaseUrl, $stateParams, Auth, Records) {
  var self = this;
  this.muscles = $stateParams.muscles
  console.log(self.muscles)

  var currentUser = Auth.getCurrentUser()
  console.log(Auth.getCurrentUser())

  var movements = firebaseUrl + 'movements/' + currentUser.$id
  var moveRef = new Firebase(movements)
  this.movements = $firebaseArray(moveRef)
    // console.log(self.movements)

  var records = firebaseUrl + 'records/' + currentUser.$id
  var recordsRef = new Firebase(records)
  this.records = $firebaseObject(recordsRef)

  //promise returns records as object
  this.records.$loaded().then(function(data) {
    console.log(data.Squat)
    self.recordData = data;
  })

  //body parts
  self.chests = ['Bench Press', 'Incline Bench Press'];
  self.legs = ['Leg press', 'Squat'];
  self.arms = ['Barbell Curl', 'Skull Crushers'];
  self.shoulders = ['Miltary Press', 'Front Raise'];
  self.abs = ['Situps', 'Window Cleaners'];

  this.selectedMuscles = [ ]
  this.muscleList = { }

  //Select muscle function
  this.addMuscle = function(muscle) {
    self.selectedMuscles.push(muscle);
    console.log(self.selectedMuscles)
      console.log('your selected muscle is ' + muscle)
      if (muscle === 'chests') {
        // self.chestChoice = true;
        self.muscleList.chest = self.chests;

        console.log(self.chestChoice);
      }
      else if (muscle === 'legs') {
        self.muscleList.legs = self.legs;
      }
      else if (muscle === 'arms') {
        self.muscleList.arms = self.arms
      }
      else if (muscle === 'shoulders') {
        self.muscleList.shoulders = self.shoulders
      }
      else {
        self.muscleList.abs = self.abs
      }
      console.log('this is muscles in the object', self.muscleList )
  };

  this.selectedMuscle = function(muscle) {
    if (self.muscleList.chest = self.chests) {
      self.currentMuscle = "chest"
    }
    else if (self.muscleList.legs = self.legs) {
    self.currentMuscle = "legs"
    }
    else if (self.muscleList.arms = self.arms) {
    self.currentMuscle = "arms"
    }
    else if (self.muscleList.shoulders = self.shoulders) {
    self.currentMuscle = "shoulders"
    }
    else {
    self.currentMuscle = "abs"
    }
  }
  this.userWorkout = [ ]

  this.exercises =  {
    chest: self.chests,
    legs: self.legs,
    arms: self.arms,
    shoulders: self.shoulders,
    abs: self.abs,
  };

  var move = self.selected;
  var chosen = self.chosen;
  self.count = 0;

  //rating logic
  self.rating = false;
  self.mood = "";
  self.bad = "";
  self.good = "";

  this.selectedMood = function (mood) {
    if (mood === 'bad') {
      self.bad = "bad";
      self.ok = "";
      self.good = "";
      self.mood = self.bad;
        console.log(self.mood + " is sad")
    }
    else if (mood === 'ok') {
      self.bad = "";
      self.ok = "ok";
      self.good = "";
    }
    else {
    self.bad = "";
    self.ok = "";
    self.good = "good";
    self.mood = self.good;
      console.log(self.mood + " is happy")
    }
  }
  //end of rating logic


  var sound = new Audio("app/sounds/sound.mp3");

  this.addExercise = function () {
    this.selectedExercises = {
      name: self.selected,
      reps: self.reps,
      weight: self.weight,
      sets: self.sets,
      count: self.count,
      mood: self.mood
    }
      angular.forEach(self.recordData, function(val, key) {
        var movement = self.selected.replace(/ /g,'_')
        if (key === movement) {
          if (self.weight > val) {
                Materialize.toast('You beat your personal best!' , 2000)
                // sound.play()
              Records.userData(movement, self.weight);
          }
        }
      })
    self.rating = true;
    self.userWorkout.push(this.selectedExercises);
    Materialize.toast('Movement added!' , 2000)
      console.log(self.selected)
        console.log([this.userWorkout])
        self.weight = "",
        self.reps = "",
        self.sets = "",
        self.selected = "",
        self.count++
        console.log(self.selectedExercises.count)
  }

    self.back = false
    this.saved = function() {
      self.back = true;
      self.movements.$add ({
        date: Date.now(),
        exercises: this.userWorkout,
      })
      swal({
        title: "Great!",
        text: "Your workout had been saved",
        // type: "warning",
         imageUrl: "app/Logo.png",
      //   showCancelButton: true,
      //   confirmButtonColor: "#DD6B55",
      //   confirmButtonText: "Yes",
      //  cancelButtonText: "No, just save my workout please!",
      //  closeOnConfirm: false,
      //  closeOnCancel: false
     });
      //  function(isConfirm){
      //    if (isConfirm) {
      //      swal("Ok! ",
      //      "Your workout has been saved");
      //     } else {
      //      swal("All good!",
      //      "Your workout has been saved");
      //    } });

      this.userWorkout=[ ];
    };
})
