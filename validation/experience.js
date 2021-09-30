const Validator =require('validator');
const isEmpty =require('./is-empty');
module.exports = function validateExpInput (data) {

    let errors = {};


    data.title = !isEmpty(data.title) ? data.title :'';
    data.company = !isEmpty(data.company) ? data.company :'';
    data.from = !isEmpty(data.from) ? data.from :'';
 
    if(Validator.isEmpty(data.title)) {
        errors.title ='Job Title field required';
    }
   
    if(Validator.isEmpty(data.company)) {
        errors.company ='Company field required';
    }
    if(Validator.isEmpty(data.from)) {
        errors.from ='From field required';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}