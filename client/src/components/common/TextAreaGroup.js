import React from 'react'
import PropTypes from'prop-types'
import classnames from 'classnames';
 const TextAreaGroup = ({
     name,
     placeholder,
     value,
     errors,
     info,
     onChange
 }) => {
    return (
        <div className="form-group">
            <textarea  className={classnames('form-control form-control-lg',{
            'is-invalid' :errors
            })} 
            placeholder={placeholder} name={name} value={value} onChange={onChange} />
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && 
            <div className='invalid-feedback'>{errors} </div>}
      </div>
    )
}
TextAreaGroup.prototype={
 name:PropTypes.string.isRequired,
 placeholder:PropTypes.string,
 value:PropTypes.string.isRequired,
 info:PropTypes.string,
 errors:PropTypes.string.isRequired,
 onChange:PropTypes.func.isRequired

}


export default TextAreaGroup;