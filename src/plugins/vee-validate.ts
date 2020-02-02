import Vue from 'vue';

import VeeValidate from 'vee-validate';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

import {required, numeric,email, min, max, alpha_num, alpha_spaces, regex,is } from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';

//rules.


extend('required', {
    ...required,
    message: 'This field is required'
});


extend('numeric', {
     ...numeric,
     message: 'The {_field_} must be a numeric value'
     });

    extend('email', email)

     extend('min', {
         ...min,
         params:['length'],
         message: '{_field_} must be atleat {length} characters long'
     });

     extend('max', max);

     extend('alpha_num', {
         ...alpha_num,
         message: 'This field must contain only alphabets and numbers'
     });

     extend('alpha_spaces', {
         ... alpha_spaces,
         //validate: (input: string)  =>  /\w+\s*\w+/i.test(input),
         message: 'This field must contain only alphabets and spaces'
     });


     extend('to_sku',{
         validate: (value, ...data: any) => {
             console.log('validation Data: ', data);
             return {required: true, data: data.name, valid: true };
         },
         computesRequired: true,
         params: [ {name:'name', isTarget: true}],
         
     })

     
     //alpha_spaces.
//Vue.component('validate', ValidationProvider);
//Vue.component('ValidationObserver', ValidationObserver);



/*
Vue.use(VeeVal,{
    events: 'change|input'
});

*/