import React from 'react';
import './navbar.scss'
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  
  return (
    <div className='navbar'>
       <div className='container navbar-container'>
           <nav className='nav'>
              <NavLink to={props.link}>{props.nameLink}</NavLink>
           </nav>
       </div>
    </div>
  )
}

export default Navbar