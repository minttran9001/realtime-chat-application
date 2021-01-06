import React from 'react'
import './style.scss'
export default function Button(props) {
    return (
        <button type={props.type} onClick={props.onClick} className='buttonGold'>{props.children}</button>
    )
}
