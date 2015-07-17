/**
 * Created by admin1 on 6/19/15.
 */


    'use strict';

    angular
        .module('amrsAppApp')
        .controller('MainController', function ($scope,provinceService) {

            var vm = this;
            //var provises = provinceService.getProvinces();
            $scope.formData = {};
            $scope.formFields = [
                {
                    //the key to be used in the model values {... "username": "johndoe" ... }
                    key: 'usernamed',

                    type: 'text',
                    label: 'Username',
                    placeholder: 'johndoe',
                    required: true,
                    disabled: false, //default: false
                    description: 'Descriptive text'
                },
                {
                    key: 'passwordd',
                    type: 'password',
                    label: 'Password',
                    required: true,
                    disabled: false, //default: false
                    expressionProperties: {
                        hide: '!model.username' // hide when username is blank
                    }
                }

            ];

            $scope.onSubmit = function() {
                console.log('form submitted:', $scope.formData);
            };
        });




