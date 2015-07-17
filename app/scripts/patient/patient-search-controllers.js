'use strict';

  var search = angular.module('patientSearch');
      search.controller('PatientSearchCtrl', function ($scope,PatientSearchService) {
      $scope.patientUuid='';

      $scope.searchPatient = function (patientUuid) {
       PatientSearchService.find(patientUuid);
      //PatientSearchService.searchPatient();
    }
  });
