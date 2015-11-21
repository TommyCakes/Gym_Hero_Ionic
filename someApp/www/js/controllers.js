angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})

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
    else {
      self.user.$loaded().then(function(data) {
          var userData = data;
          console.log(data)
        if (userData.newUser !== false) {
            return $location.path('/newUser')
        }
        else {
          return $state.go('tab.home')
        }
      })
    }
  })
  this.logout = Auth.logout
  // console.log(self.users)
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
