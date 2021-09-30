const Validator =require('validator');
const isEmpty =require('./is-empty');
module.exports = function validateLoginInput (data) {

    let errors = {};


    data.email = !isEmpty(data.email) ? data.email :'';
    data.password = !isEmpty(data.password) ? data.password :'';
    if(!Validator.isEmail(data.email)) {
        errors.email ='Email field Invalid';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email ='Email field required';
    }
   
    if(Validator.isEmpty(data.password)) {
        errors.password ='Password field required';
    }
    if(!Validator.isLength(data.password,{min:2, max:30})) {
        errors.password ='The password must be 2 to 30 character';
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}