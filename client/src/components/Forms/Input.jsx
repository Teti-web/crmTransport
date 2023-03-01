import React from 'react'
import './forms.components.scss'

const Input = (props) => {
  return (
    <div class="input-material">
      <input type={props.typeInput} name={props.nameInput}  placeholder="" onChange={props.onChangeInput} value={props.valueInput}  class="control-material" required />
      <label className='label-custom' htmlFor={props.nameInput}>{props.nameLabel}</label>
   </div>
  )
}

export default Input