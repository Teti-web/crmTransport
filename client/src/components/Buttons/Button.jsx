import React from 'react'
import './button.component.scss'

const Button = (props) => {
  return (
    <button className={props.classCSS} onClick={props.buttonOnClick}>
       {props.buttonTitle}
    </button>
  )
}

export default Button
