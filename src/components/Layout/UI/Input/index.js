import React, { useState } from 'react'
import './style.scss'
export default function Input({value,type,label,onChange,placeholder}) {
    const [inputGroup,setInputGroup] = useState('inputGroup')
    const handleChange = (e)=>{
        const {value}=e.target;
        onChange(value);
    }
    const onFocus = (e)=>{
        setInputGroup('inputGroup onFocus')
    }
    return (
        <div className={inputGroup}>
            <label>{label}</label>
            <input type={type} onFocus={onFocus} onChange={handleChange} placeholder={placeholder} value={value} />
            <div className='line'></div>
        </div>
    )
}
