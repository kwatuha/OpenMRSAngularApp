'use strict';

 var patient = angular.module('patientSearch');

patient.directive('isolatedScopeWithController', function () {
  return {
    restrict: 'EA',
    scope: {
      dataSource: '=',
      add: '&',
    },
    controller: function ($scope) {
     $scope.customers=[];
      $scope.patientuuid='';
        $scope.addCustomer = function () {
        //Call external scope's function
        var name = 'New Customer Added by Directive'+$scope.patientuuid;

          //

          $scope.getResults=function(patientuuid)
          {
            $scope.patients=patientSearchService.find($scope.patientuuid);
          }

          //$scope.patients={};


          //
        $scope.add({ name: name });

        //Add new customer to directive scope
         $scope.customers.push({
          name: name,
          street: 'Test' + ' Main St.'
        });
      };
    },
    templateUrl: 'views/patient/patientdemographics.html'
  };
});
//<div isolated-scope-with-controller datasource="customers" add="addCustomer(name)"></div>
