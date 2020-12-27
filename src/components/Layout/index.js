import React from 'react'
import Header from '../../components/Header/index'
export default function Layout(props) {
    return (
        <div className='layout'>
            <Header/>
            {props.children}
        </div>
    )
}
