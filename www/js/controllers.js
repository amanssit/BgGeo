angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPlatform) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {

      /**
       * This callback will be executed every time a geolocation is recorded in the background.
       */
      var callbackFn = function (location) {
        console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
        var data = [];
        if (!localStorage.data) {
          data.push(location);
          localStorage.data = JSON.stringify(data);
        }
        else {
          data = JSON.parse(localStorage.data);
          data.push(location);
          localStorage.data = JSON.stringify(data);
        }
        // Do your HTTP request here to POST location to your server.
        // jQuery.post(url, JSON.stringify(location));

        /*
         IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
         and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
         IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
         */
        backgroundGeolocation.finish();
      };

      var failureFn = function (error) {
        console.log('BackgroundGeolocation error');
      };

      // BackgroundGeolocation is highly configurable. See platform specific configuration options
      backgroundGeolocation.configure(callbackFn, failureFn, {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        interval: 1000
      });
      backgroundGeolocation.switchMode(backgroundGeolocation.mode.BACKGROUND);

      // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      backgroundGeolocation.start();


      // If you wish to turn OFF background-tracking, call the #stop method.
      // backgroundGeolocation.stop();
    }


    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    if (localStorage.data) {
  $scope.locations=JSON.parse(localStorage.data);
    }
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
