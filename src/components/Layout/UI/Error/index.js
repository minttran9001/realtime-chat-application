import React from 'react'
import './style.scss'
import {RiErrorWarningFill} from 'react-icons/ri'
const Error = (props)=>{
    return(
        <div className='error'>
            <p>{props.children}</p>
            <RiErrorWarningFill className='icon'/>
        </div>
    )
}
export default Error