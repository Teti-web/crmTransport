import React from 'react';

import Form from '../Forms/Forms';
import Input from '../Forms/Input';
import Button from '../Buttons/Button';

const EditEvent = (updateEvent, changeHandler) => {
   
  return (
    <div>
    <h3 className='modal_title'>Update event</h3>
 <Form key={formKey}>
      
      <Input typeInput='text' nameInput='title' nameLabel='Title'onChangeInput={changeHandler}/>
      <div className='input-date'>
        <span>Start</span>
      <Input typeInput='datetime-local' nameInput='start' nameLabel=''onChangeInput={changeHandler}/>
      </div>
      <div className='input-date '>
        <span>End</span>
      <Input typeInput='datetime-local' nameInput='end' nameLabel=''onChangeInput={changeHandler}/>
      </div>
 </Form>
 <Button classCSS='btn btn-form' buttonTitle='Update' buttonOnClick={updateEvent}/>
 </div>
  )
}

export default EditEvent
