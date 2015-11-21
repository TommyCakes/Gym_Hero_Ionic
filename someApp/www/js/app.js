// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('workoutApp', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])
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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  // if none of the above states are matched, use this as the fallback

  .state('signIn', {
    url: '/signIn',
    templateUrl: 'templates/signIn.html',
    controller: 'HomeCtrl as app'
})
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

  .state('tab.addMovement', {
      url: '/addMovement',
      views: {
        'tab-addMovement': {
          templateUrl: 'templates/tab-addMovement.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.previousWorkouts', {
    url: '/previousWorkouts',
    views: {
      'tab-previousWorkouts': {
        templateUrl: 'templates/tab-previousWorkouts.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.records', {
    url: '/records',
    views: {
      'tab-records': {
        templateUrl: 'templates/tab-records.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // .state('tab.chat-detail', {
  //   url: '/chats/:chatId',
  //   views: {
  //     'tab-chats': {
  //       templateUrl: 'templates/chat-detail.html',
  //       controller: 'ChatDetailCtrl'
  //     }
  //   }
  // });
    $urlRouterProvider.otherwise('/signIn')
});
