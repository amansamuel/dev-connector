import React from 'react'
import PropTypes from'prop-types'
import classnames from 'classnames';
 const SelectListGroup = ({
     name,
     placeholder,
     value,
     errors,
     info,
     onChange,
     options
 }) => {

    const selectOptions =options.map(option =>(
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))


    return (
        <div className="form-group">
            <select  className={classnames('form-control form-control-lg',{
            'is-invalid' :errors
            })} 
            name={name} 
            value={value} 
            onChange={onChange} >
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && 
            <div className='invalid-feedback'>{errors} </div>}
      </div>
    )
}
SelectListGroup.prototype={
 name:PropTypes.string.isRequired,
 value:PropTypes.string.isRequired,
 info:PropTypes.string,
 errors:PropTypes.string.isRequired,
 onChange:PropTypes.func.isRequired,
 options:PropTypes.object.isRequired
}


export default SelectListGroup;