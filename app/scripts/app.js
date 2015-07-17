'use strict';

/**
 * @ngdoc overview
 * @name amrsAppApp
 * @description
 * # amrsAppApp
 *
 * Main module of the application.
 */
angular
  .module('amrsAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'patientSearch',
    'amrsAuth',
    'formEntry',
    'formly',
    'formlyBootstrap',
     'ui.bootstrap'
  ])
  .run(function(formlyConfig) {
    var attributes = [
      'date-disabled',
      'custom-class',
      'show-weeks',
      'starting-day',
      'init-date',
      'min-mode',
      'max-mode',
      'format-day',
      'format-month',
      'format-year',
      'format-day-header',
      'format-day-title',
      'format-month-title',
      'year-range',
      'shortcut-propagation',
      'datepicker-popup',
      'show-button-bar',
      'current-text',
      'clear-text',
      'close-text',
      'close-on-date-selection',
      'datepicker-append-to-body'
    ];

    var bindings = [
      'datepicker-mode',
      'min-date',
      'max-date'
    ];

    var ngModelAttrs = {};

    angular.forEach(attributes, function(attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    angular.forEach(bindings, function(binding) {
      ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    console.log(ngModelAttrs);

    formlyConfig.setType({
      name: 'datepicker',
      template: '<input class="form-control" ng-model="model[options.key]" is-open="to.isOpen" datepicker-options="to.datepickerOptions" />',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          addonLeft: {
            class: 'glyphicon glyphicon-calendar',
            onClick: function(options, scope) {
              options.templateOptions.isOpen = !options.templateOptions.isOpen;
            }
          },
          onFocus: function($viewValue, $modelValue, scope) {
            scope.to.isOpen = !scope.to.isOpen;
          },
          datepickerOptions: {}
        }
      }
    });

    function camelize(string) {
      string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      // Ensure 1st char is always lowercase
      return string.replace(/^([A-Z])/, function(match, chr) {
        return chr ? chr.toLowerCase() : '';
      });
    }
  }).config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'LoginController'
            })
            .when('/patient/search', {
            templateUrl: 'views/patient/patientsearch.html',
            controller: 'PatientSearchCtrl'
          }).when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutCtrl'
          })
            .otherwise({
                redirectTo: '/'
            });
    });
angular.module('amrsAppApp').run( function($rootScope, $location) {

  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    var  a= 0;
    if(a){

    }
  });
});
// templateUrl: 'views/patient/patientsearch.html',
