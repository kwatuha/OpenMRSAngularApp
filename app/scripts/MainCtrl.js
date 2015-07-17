/**
 * Created by admin1 on 6/19/15.
 */
    'use strict';
    angular
        .module('amrsAppApp')
 .controller('MainController', function ($scope,$http,$resource,provinceService,AuthService,FormEntryService) {

            var vm = this;

            var baseUrl="http://127.0.0.1:8080/amrs/ws/rest/v1/";

            vm.model={}
            vm.fields = {};




        vm.fields=FormEntryService.getFormFields('test');
            var encounterObs=[];
            vm.submit=function(){
            var encData=  FormEntryService.createSubmitPayload(vm.model);
            saveObs(encData);
            };
        ///
        ///
            vm.getResource = function(){
                return $resource(baseUrl + 'obs/:uuid',
                    {uuid: '@uuid'},
                    {query: {method: "GET", isArray: false}}
                );
            };
            vm.getEncounterResource = function(){
                return $resource(baseUrl + 'encounter/:uuid',
                    {uuid: '@uuid'},
                    {query: {method: "GET", isArray: false}}
                );
            };

            function saveObs(enc){

                /*AuthService.login({ username: '',password: ''},
                function(){*/

                    console.log(enc);
                    var testObj=vm.getEncounterResource().save(JSON.stringify(enc),function(data){

                    });


               // });
                 }
     function callback(data){
                console.log(data);
     }

        ///



     //v

                   /* var authdata = Base64.encode('')
                 $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
                 //
                 var obsSaved= $resource(baseUrl + 'obs',
                     {
                         "person":"5b6e348c-1359-11df-a1f1-0026b9348838",
                         "obsDatetime":"2015-06-21",
                         "concept":"a8a65fee-1350-11df-a1f1-0026b9348838",
                         "value":"35"
                     }
                 );*/

                //
                   /*for(var i=0;i<obsData.length;i++)
                    {
                        console.log(obsData[i]);
                        vm.getResource().save(obsData[i],function(data){

                            console.log(data);
                        });
                    }
*/



        }

);
