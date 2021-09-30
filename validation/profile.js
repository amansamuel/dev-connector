const Validator =require('validator');
const isEmpty =require('./is-empty');
module.exports = function validateProfileInput (data) {

    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle :'';
    data.skills = !isEmpty(data.skills) ? data.skills :'';
    data.status = !isEmpty(data.status) ? data.status :'';
    if(!Validator.isLength(data.handle,{min:2, max:30})) {
        errors.handle ='The handle must be 2 to 30 character';
    }
    if(Validator.isEmpty(data.handle)) {
        errors.handle ='Handle field required';
    }
    if(!Validator.isLength(data.skills,{min:2, max:100})) {
        errors.skills ='The Skills must be 2 to 30 character';
    }
    if(Validator.isEmpty(data.skills)) {
        errors.skills ='Skills field required';
    }
    if(!Validator.isLength(data.status,{min:2, max:30})) {
        errors.status ='The Status must be 2 to 30 character';
    }
    if(Validator.isEmpty(data.status)) {
        errors.status ='Status field required';
    }
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website ='Not a Valid URL'
        }
    }
    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube ='Not a Valid URL'
        }
    }
    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook ='Not a Valid URL'
        }
    }
     return {
        errors,
        isValid:isEmpty(errors)
    }
}