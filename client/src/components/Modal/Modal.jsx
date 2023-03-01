import React from 'react';
import './modal.components.scss'
import {AiOutlineCloseCircle} from 'react-icons/ai'

const Modal = ({active, setActive, children}) => {

  const modalClosed = () => {
    setActive(false);
    window.location.reload();
  }

  return (
    <div className={active ? 'modal active':'modal'}onClick={modalClosed}>
        <div className={active ? 'modal-content active':'modal-content'} onClick={e=>e.stopPropagation()}>
           <AiOutlineCloseCircle onClick={modalClosed}/>
            {children}
        </div>
    </div>
  )
}

export default Modal