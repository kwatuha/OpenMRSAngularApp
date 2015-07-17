'use strict';
var search = angular.module('formEntry');
search.factory('FormEntryService',['$http','$resource','AuthService','AUTH_EVENTS', function ($http,$resource,AuthService,AUTH_EVENTS) {
  var formEntryService = {};

  formEntryService.getFormFields=function(formId){
    var formlyFields=[];
    var formsFields=getFormFieldList();
    for(var key in formsFields) formlyFields.push(createFormlyField(formsFields[key]));
    return formlyFields;

  }

  //Create submit payload
  formEntryService.createSubmitPayload=function(formModel){
    var encounterObs=[];

    for(var key in formModel){
      if(formModel[key].constructor === Array){
        for(var response in formModel[key]){
          var obs= {
            obsDatetime:"2015-07-15",
            concept:getConceptUUidById(key),
            value:formModel[key][response]
          };
          encounterObs.push(obs);
        }

      }else{
        alert(JSON.stringify(formModel)+'The key'+key+'----YYYYYYYYYYYYYYY=='+getConceptUUidById(key)+'OOOOO'+formModel[key])
        var obs= {
          obsDatetime:"2015-07-15",
          concept:getConceptUUidById(key),
          value:formModel[key]
        };
        encounterObs.push(obs);
      }
    }
    //Add obs to the encounter
    var encData={
      encounterType:"8d5b2be0-c2cc-11de-8d13-0010c6dffd0f",
      patient:"5b6e348c-1359-11df-a1f1-0026b9348838",
      encounterDatetime:"2015-07-14T11:28:20Z",
      obs:encounterObs
    };
    //Now submit the encounter
    //var formsFields=getFormFieldList();

   return encData;
  }

return formEntryService;
}])

function createFormlyField(fieldDef){
 // alert(JSON.stringify(fieldDef.model));
  var f={};
  var fieldType=fieldDef['type'];
  if(fieldType==='select'||fieldType==='radio'||fieldType==='multiCheckbox'){
    f= {
      key:fieldDef.conceptId,
      type: fieldDef.type,
      templateOptions: {
        label: fieldDef.label,
        options:getFieldOptions(fieldDef)
      }
    };

  }
  else{
      if(fieldType==='datepicker'){

       f= {
          key: fieldDef.conceptId,
          type: fieldDef.type,
          templateOptions: {
          label: fieldDef.label,
            type: "text",
            datepickerPopup: "yyyy-MM-dd"
        }
        };
      }
      else{

        f= {
          key:fieldDef.conceptId,
          type: fieldDef.type,
          templateOptions: {
            label: fieldDef.label
          }
        };
      }

  }

  return f;
}

function getFieldOptions(fieldDef){

  var fieldOptions=fieldDef.optionItems.split(',');
  var optionLabels=fieldDef.optionLabels.split(',');
  var options=[];

  if(fieldOptions.length==optionLabels.length){
    for(var i=0;i<fieldOptions.length;i++){
      options.push({
        "name": optionLabels[i],
        "value":getConceptUUidById(fieldOptions[i])
      });
    }

  }
  return options;

}
function getConceptUUidById(conceptId){
  var concepts= getConceptMapping();
  for(var i=0; i<concepts.length; i++) {
    for(var key in concepts[i]) {
      if(concepts[i]['concept']==conceptId) {
        return concepts[i]['uuid'];
      }
    }

  }
  return 'NotFound';
}

function getFormFieldList(){
  var forms=[];

  var adultReturnForms=
    [{
      groupId:7016,
      id:'transferin',
      conceptId:1915,
      groupName:'',
      label:'Transfer in from other AMPATH clinic (specify)',
      type:'input',
      validators:false
    },
      {
        conceptId:1839,
        id:'visittype',
        label:'Visit type',
        model:{t:31,r:32},
        optionItems:"1246, 1837, 1838",
        optionLabels:"Scheduled visit, Unscheduled Visit Early, Unscheduled Visit Late",
        type:'radio',
        validators:false
      }/*,
      {
        conceptId:7029,
        id:'scheduledDate',
        label:'If unscheduled, actual scheduled date',
        type:'input',
        validators:false
      }*/,
      {
        conceptId:1054,
        id:'maritalstatus',
        label:'7. Marital Status:',
        optionItems:"5555, 1060, 1057, 6290, 1058, 1056, 1059",
        optionLabels:"Married Monogamous, Cohabiting, Single, Married Polygamous, Divorced, Separated, Widowed",
        type:'radio',
        validators:false
      },
      {
        conceptId:6096,
        id:'discouple',
        label:'8. Discordant couple: ',
        optionItems:"1065, 1066, 1067",
        optionLabels:"Yes, No, Unknown",
        type:'radio',
        validators:false
      },
      {
        conceptId:6266,
        id:'nhif',
        label:'9. Patient covered by NHIF',
        optionItems:"6815, 1107",
        optionLabels:"Yes, No",
        type:'radio',
        validators:false
      },
      {
        conceptId:6174,
        id:'tbSymptoms',
        label:'13a. TB Symptoms:',
        optionItems:"1107,6171,8067,8065,832,136,5960,8061,8059,8060,6019,5312,8066",
        optionLabels:"None,Cough  2 weeks,New exposure to household contact with TB,Fever for 2 weeks,Noticeable Weight loss,Chest pain,Breathlessness,Night sweats = 2 weeks,Swelling of Neck,Armpit,Abdomen,Joints,Groin",
        type:'multiCheckbox',
        validators:false
      }];

  var adultReturnForm=
    [{
      conceptId:6266,
      id:'nhif',
      label:'9. Patient covered by NHIF',
      optionItems:"6815, 1107",
      optionLabels:"Yes, No",
      type:'select',
      validators:false
    },{
      id:'transferin',
      conceptId:5088,
      groupName:'',
      label:'Temp C',
      type:'input',
      validators:false
     },
      {
        conceptId:1839,
        id:'visittype',
        label:'Visit type',
        optionItems:"1246,1837,1838",
        optionLabels:"Scheduled visit, Unscheduled Visit Early, Unscheduled Visit Late",
        type:'radio',
        validators:false
      },{
      conceptId:6174,
      id:'tbSymptoms',
      label:'13a. TB Symptoms:',
      optionItems:"1107,6171,8067,8065,832,136,5960,8061,8059,8060,6019,5312,8066",
      optionLabels:"None,Cough  2 weeks,New exposure to household contact with TB,Fever for 2 weeks,Noticeable Weight loss,Chest pain,Breathlessness,Night sweats = 2 weeks,Swelling of Neck,Armpit,Abdomen,Joints,Groin",
      type:'multiCheckbox',
      validators:false
    },
      {
      conceptId:7029,
      id:'scheduledDate',
      label:'If unscheduled, actual scheduled date',
      type:'datepicker',
      validators:false
    }];

  return adultReturnForm;
}

function getConceptMapping(){
  var conceptMap=[
    {concept:5088,uuid:'a8a65fee-1350-11df-a1f1-0026b9348838'},
    {concept:136,uuid:'a892e4b4-1350-11df-a1f1-0026b9348838'},
    {concept:832,uuid:'a89807f0-1350-11df-a1f1-0026b9348838'},
    {concept:1054,uuid:'a899a9f2-1350-11df-a1f1-0026b9348838'},
    {concept:1056,uuid:'a899aba0-1350-11df-a1f1-0026b9348838'},
    {concept:1057,uuid:'a899ac7c-1350-11df-a1f1-0026b9348838'},
    {concept:1058,uuid:'a899ad58-1350-11df-a1f1-0026b9348838'},
    {concept:1059,uuid:'a899ae34-1350-11df-a1f1-0026b9348838'},
    {concept:1060,uuid:'a899af10-1350-11df-a1f1-0026b9348838'},
    {concept:1065,uuid:'a899b35c-1350-11df-a1f1-0026b9348838'},
    {concept:1066,uuid:'a899b42e-1350-11df-a1f1-0026b9348838'},
    {concept:1067,uuid:'a899b50a-1350-11df-a1f1-0026b9348838'},
    {concept:1107,uuid:'a899e0ac-1350-11df-a1f1-0026b9348838'},
    {concept:1246,uuid:'a89b6440-1350-11df-a1f1-0026b9348838'},
    {concept:1837,uuid:'a89ff816-1350-11df-a1f1-0026b9348838'},
    {concept:1838,uuid:'a89ff8de-1350-11df-a1f1-0026b9348838'},
    {concept:1839,uuid:'a89ff9a6-1350-11df-a1f1-0026b9348838'},
    {concept:1915,uuid:'a8a06fc6-1350-11df-a1f1-0026b9348838'},
    {concept:5312,uuid:'a8a774b0-1350-11df-a1f1-0026b9348838'},
    {concept:5555,uuid:'a8aa76b0-1350-11df-a1f1-0026b9348838'},
    {concept:5960,uuid:'a8ad1276-1350-11df-a1f1-0026b9348838'},
    {concept:6019,uuid:'a8ad462e-1350-11df-a1f1-0026b9348838'},
    {concept:6096,uuid:'a8af49d8-1350-11df-a1f1-0026b9348838'},
    {concept:6171,uuid:'a8afc8b8-1350-11df-a1f1-0026b9348838'},
    {concept:6174,uuid:'a8afcafc-1350-11df-a1f1-0026b9348838'},
    {concept:6266,uuid:'a8b02524-1350-11df-a1f1-0026b9348838'},
    {concept:6290,uuid:'a8b03712-1350-11df-a1f1-0026b9348838'},
    {concept:6815,uuid:'8b715fed-97f6-4e38-8f6a-c167a42f8923'},
    {concept:7029,uuid:'dc1942b2-5e50-4adc-949d-ad6c905f054e'},
    {concept:8059,uuid:'4639388c-ee31-4dcf-abb4-ad71253493bb'},
    {concept:8060,uuid:'5c5e5e89-8e4d-451d-9471-fbe359d40b00'},
    {concept:8061,uuid:'e1862fef-68ed-4df4-90dd-a00152f719aa'},
    {concept:8065,uuid:'d7adae14-c386-49cc-8f7c-765d8ceec566'},
    {concept:8066,uuid:'f218c60e-4b54-475a-a4fa-facab9216da8'},
    {concept:8067,uuid:'3f57aafc-7162-41da-a51b-6a804cb6f5e8'}
  ]

  return conceptMap;
}
