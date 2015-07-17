'use strict';
  var search = angular.module('patientSearch');
      search.factory('PatientSearchService',['$http','$resource','AuthService','AUTH_EVENTS', function ($http,$resource,AuthService,AUTH_EVENTS) {
        var patientSearchService = {};
         var patients=[];
          var patientObj={};

          patientSearchService.find = function (patientUuid) {
                console.log("Running Patient Search===="+patientUuid);

                    //
                    var serverUrl='http://localhost:8080/amrs/ws/rest/v1/patient?q=:name&v=custom:(uuid,person)' ;
//patient?q=:search&v=custom:(uuid,person)'
            // var serverUrl='http://localhost:8080/amrs/ws/rest/v1/patient?q=:name' ;

            ///////////////////////
           /* AuthService.login({ username: '',password: ''},
              function(){
                alert('Successfull login');

              });*/

            //////////////////////////
                    var Patient = $resource(
                                  serverUrl,
                                  {name: '@patientUuid'},
                                  {query: {method: 'GET',
                                  isArray: false}});
                            var searchResults={};
                    var patient2 = Patient.get({name:patientUuid}, function(response) {
                     console.log("success=="+response.results);
                                 searchResults=response.results
                      //patient.person.display
                         angular.forEach(response.results, function(value, key) {
                                      console.log("patient Name=="+value.person.display + '==XXXXX==uuid==' + value.uuid);
                           /*patientObj.name=key.display
                           patientObj.uuid=value.uuid;*/

                           //now push individual patient to patients array
                           //patients.push(patientObj);
                           });

                     }).$promise
.then(function(responce){
onQueryCompleted(responce.results);
})


          };

          //Save Form
          patientSearchService.saveEncounter = function (patientUuid) {
              console.log("Running Patient Search===="+patientUuid);

              //


          };






        return patientSearchService;
}])
function onQueryCompleted(results){
      console.log(results.display+"Last call by call back")

}



