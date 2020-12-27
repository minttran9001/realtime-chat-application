import React from 'react'
import './style.scss'
export default function Button(props) {
    return (
        <button type={props.type} className='buttonGold'>{props.children}</button>
    )
}
