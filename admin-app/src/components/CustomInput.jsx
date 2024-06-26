import React from 'react';
const CustomInput = (props) => {
    const {type,label,i_id,i_class,name,val,onchange,onBlur} =props
    return (
        <div className="form-floating mt-3">
            <input 
                value={val} 
                type={type} 
                className={`form-control ${i_class}`} 
                name={name} 
                id={i_id} 
                placeholder={label}
                onChange={onchange}
                onBlur={onBlur}
                />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}

export default CustomInput;
