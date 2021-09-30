import React from 'react'
import PropTypes from'prop-types'
import classnames from 'classnames';
 const TextFieldGroup = ({
     name,
     placeholder,
     value,
     label,
     errors,
     info,
     type,
     onChange,
     disabled
 }) => {
    return (
        <div className="form-group">
            <input type={type} className={classnames('form-control form-control-lg',{
            'is-invalid' :errors
            })} 
            placeholder={placeholder} disabled={disabled} name={name} value={value} onChange={onChange} />
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && 
            <div className='invalid-feedback'>{errors} </div>}
      </div>
    )
}
TextFieldGroup.prototype={
 name:PropTypes.string.isRequired,
 placeholder:PropTypes.string,
 value:PropTypes.string.isRequired,
 info:PropTypes.string,
 errors:PropTypes.string.isRequired,
 type:PropTypes.string.isRequired,
 onChange:PropTypes.func.isRequired,
 disabled:PropTypes.string,
}
TextFieldGroup.defaultProps ={
    type:'text'
}

export default TextFieldGroup;