const Validator =require('validator');
const isEmpty =require('./is-empty');
module.exports = function validateEducationInput (data) {

    let errors = {};

    data.school = !isEmpty(data.school) ? data.school :'';
    data.degree = !isEmpty(data.degree) ? data.degree :'';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy :'';
    data.from = !isEmpty(data.from) ? data.from :'';
    data.to = !isEmpty(data.to) ? data.to :'';
 
    if(Validator.isEmpty(data.school)) {
        errors.school ='School Title field required';
    }
   
    if(Validator.isEmpty(data.degree)) {
        errors.degree ='Degree field required';
    }
    if(Validator.isEmpty(data.from)) {
        errors.from ='From field required';
    }
    if(Validator.isEmpty(data.to)) {
        errors.to ='To field required';
    }
    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.to ='Field of Study required';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}