import React from 'react'
import './style.scss'
export default function Title(props) {
    return (
        <div className='title'>
            <p >{props.children}</p>
        </div>
    )
}
