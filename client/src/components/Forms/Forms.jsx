import React from 'react';
import './forms.components.scss';

const Forms = ({children},props) => {
    
  return (
    <form class="form" >
        {children}
      <button type="submit" class="btn">{props.nameButton}</button>
  </form>
  )
}

export default Forms