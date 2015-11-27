
angular.module('workoutApp', ['ionic', 'firebase'])
.constant('firebaseUrl', 'https://gym-hero.firebaseio.com/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  // Set up the various states which the app can be in.
  $stateProvider
//   .state('signIn', {
//     url: '/signIn',
//     templateUrl: 'templates/signIn.html',
//     controller: 'HomeCtrl as app'
// })
//TODO: Add Back in SignIn state!

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })
  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        // controller:  'HomeCtrl as home'
      }
    }
  })
  .state('tab.createWorkout', {
      url: '/createWorkout',
      views: {
        'tab-createWorkout': {
          templateUrl: 'templates/tab-createWorkout.html',
          controller: 'MoveCtrl as move',
        }
      }
    })
  .state('tab.createWorkout.addMovement', {
      url: '/addMovement',
      views: {
        'tab-createWorkout@tab': {
          controller: "MoveCtrl as move",
          templateUrl: 'templates/tab-addMovement.html',
          params: {
            muscles: {}
          }
        }
      }
    })
    // .state('tab.chat-detail', {
    //   url: '/addMovement/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.previousWorkouts', {
    url: '/previousWorkouts',
    views: {
      'tab-previousWorkouts': {
        templateUrl: 'templates/tab-previousWorkouts.html',
        controller: 'MoveCtrl as move'
      }
    }
  })
  .state('tab.records', {
    url: '/records',
    views: {
      'tab-records': {
        templateUrl: 'templates/tab-records.html',
        controller: 'MoveCtrl as move'
      }
    }
  })
  // $urlRouterProvider.otherwise('/signIn')
  $urlRouterProvider.otherwise('/tab/home')

});
