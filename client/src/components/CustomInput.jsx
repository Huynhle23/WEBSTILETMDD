import React from 'react';

const CustomInput = (props) => {
    const {type,name,placeholder,className,values,onChange,onBlur} = props
    return (
        <div className="">
            <input 
                type={type} 
                name={name} 
                value={values}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`form-control ${className}`} />
        </div>
    );
}

export default CustomInput;
