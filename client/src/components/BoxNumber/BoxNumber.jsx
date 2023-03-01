import React from 'react'
import './boxnumber.component.scss'
import { Link } from 'react-router-dom'

const BoxNumber = (props) => {
  return (
   
    <div className='boxnumber'> 
        <Link to={props.link} className='boxnumber-other'>
            <span className='boxnumber-title'>{props.title}</span>
            <span className='boxnumber-number'>{props.number}</span>   
       </Link>
    </div>

  )
}

export default BoxNumber
