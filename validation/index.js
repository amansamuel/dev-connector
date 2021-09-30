const Validator= require('validator');
const isEmpty =require('./is-empty')
module.exports =function validatorInput(data) {
    const error={};
    data.name=!isEmpty(data.name) ? data.name : '';
    data.email=!isEmpty(data.email) ? data.email : '';
    data.password=!isEmpty(data.password) ? data.password : '';
    if(!Validator.isLength(data.name,{min:2 ,max:30})) {
        error.name='Name must be between 3 to 30';

    }
    if(Validator.isEmpty(data.name)) {
        error.name ='Name field is required';
    }
    if(Validator.isEmpty(data.email)) {
        error.email ='Email field is required';
    }
    if(!Validator.isEmail(data.email)) {
        error.email ='Email field is invalid';
    }
    if(Validator.isEmpty(data.password)) {
        error.password ='Password field is required';
    }
    if(!Validator.isLength(data.password,{min:2,max:30})) {
        error.password ='Password must be between 2 and 30';
    }
    if(Validator.isEmpty(data.password2)) {
        error.password2 ='Confirm Password field is required';
    }
    if(!Validator.equals(data.password,data.password2)) {
        error.password2 =`Password  and Confirm Password must be matched ${data.password.length}`;
    }
    return {
        error,
        isValid:isEmpty(error)
    }
}


