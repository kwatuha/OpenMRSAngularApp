/*'use strict';

var auth = angular.module('amrsAuth');
  auth.controller('LoginController', function ($scope,AuthService) {
    $scope.credentials = {
    username: '',
    password: ''
  };

  //authSearvice={};
    $scope.login= function (credentials) {

       AuthService.login(credentials,successcallback,failedcallback);
    }
  });

function successcallback(test){
  alert('test Mu'+test);
};

function failedcallback(data){

  alert('The connection could Not get'+data);
}*/
/*jshint -W003 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name authentication.controller:AuthenticationCtrl
   * @description
   * # AuthenticationCtrl
   * Controller of the authentication
   */
  angular
    .module('amrsAuth')
    .controller('LoginController', LoginController);
  MainCtrl.$nject = ['$scope'];

  function LoginController($scope,AuthService) {

    //Pass username and password from scope
    $scope.credentials = {
      username: $scope.username,
      password: $scope.password
    };

    //Create function to execute the login function:
    $scope.login= function (credentials) {
    AuthService.login(credentials,credentials,AuthService.successcallback,AuthService.failedcallback);}


  }
})();



