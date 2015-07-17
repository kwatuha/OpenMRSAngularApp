/**
 * Created by admin1 on 6/19/15.
 */

(function() {

    'use strict';

    angular
        .module('amrsAppApp')
        .controller('MainController', [provinceService,MainController]);

    function MainController() {

        var vm = this;
      var provises=  provinceService.getProvinces();
        vm.fields=[   {
            "type": "input",
            "key": "firstName",
            "templateOptions": {
            "type": "text", // or url, or text, etc.
                "placeholder": "jane doe",
                "label": "First name"
        }
        },{
            "type": "input",
            "key": "middleName",
            "templateOptions": {
                "type": "text", // or url, or text, etc.
                "placeholder": "Ma doe",
                "label": "Middle name"
            }
        },{
            "type": "textarea",
            "key": "about",
            "templateOptions": {
                "placeholder": "I like puppies",
                "label": "Tell me about yourself",
                "rows": 4,
                "cols": 15
            }
        },
            {
                "type": "checkbox",
                "key": "checkThis",
                "templateOptions": {
                    "label": "Check this box"
                }
            },{
                "key": "triedEmber",
                "type": "radio",
                "templateOptions": {
                    "label": "Have you tried EmberJs yet?",
                    "options": [
                        {
                            "name": "Yes, and I love it!",
                            "value": "yesyes"
                        },
                        {
                            "name": "Yes, but I'm not a fan...",
                            "value": "yesno"
                        },
                        {
                            "name": "Nope",
                            "value": "no"
                        }
                    ]
                }
            },{
                "key": "transportation",
                "type": "select",
                "templateOptions": {
                    "label": "How do you get around in the city",
                    "valueProp": "name",
                    "options": [
                        {
                            "name": "Car"
                        },
                        {
                            "name": "Helicopter"
                        },
                        {
                            "name": "Sport Utility Vehicle"
                        },
                        {
                            "name": "Bicycle",
                            "group": "low emissions"
                        },
                        {
                            "name": "Skateboard",
                            "group": "low emissions"
                        },
                        {
                            "name": "Walk",
                            "group": "low emissions"
                        },
                        {
                            "name": "Bus",
                            "group": "low emissions"
                        },
                        {
                            "name": "Scooter",
                            "group": "low emissions"
                        },
                        {
                            "name": "Train",
                            "group": "low emissions"
                        },
                        {
                            "name": "Hot Air Baloon",
                            "group": "low emissions"
                        }
                    ]
                }
            },{
                "key": "transportationT",
                "type": "select",
                "templateOptions": {
                    "label": "How do you get around in the city",
                    "valueProp": "name",
                    "options": [
                        {
                            "name": "Car"
                        },
                        {
                            "name": "Helicopter"
                        }

                    ]
                }
            }];

    }

})();


