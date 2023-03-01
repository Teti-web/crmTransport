import React, { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FaChartPie} from "react-icons/fa";
import {ImExit} from 'react-icons/im';
import {BiCar} from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai';
import {GoCalendar} from 'react-icons/go';
import {FaRoute} from 'react-icons/fa';
import {HiOutlineUsers} from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';
import { useStateContext } from '../../context/ContextProvider';
import './sidebar.component.scss';


const Sidebar = () => {
  const navigete = useNavigate();
  const auth = useContext(AuthContext);


  const { activeMenu} = useStateContext();

  const logoutHandler = event =>{
     event.preventDefault();
     auth.logout();
     navigete('/');
  }

  return (<>
    {activeMenu && (
    <div className= 'sidebar'>
      <div className="sidebar-container">
      
      <div className='sidebar-list'>
        <ul>
            <li>
              <Link to="/" >
                 <span className='title'><h2>TorCrm</h2></span>
              </Link>
            </li>

            <li>
              <Link to="/">
                 <FaChartPie className='icon'/>
                 <span className='title'>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar">
                 <GoCalendar className='icon'/>
                 <span className='title'>Calendar</span>
              </Link>
            </li>

            <li>
              <Link to="/cars">
                 <BiCar className='icon'/>
                 <span className='title'>Cars</span>
              </Link>
            </li>

            <li>
              <Link to="/drivers">
                 <AiOutlineUser className='icon'/>
                 <span className='title'>Drivers</span>
              </Link>
            </li>
          
            <li>
              <Link to="/routes">
                 <FaRoute className='icon'/>
                 <span className='title'>Routes</span>
              </Link>
            </li>

            <li>
              <Link to="/clients">
                 <HiOutlineUsers className='icon'/>
                 <span className='title'>Client</span>
              </Link>
            </li>

          

        </ul>
        </div>
         <div className='logout'>
              <Link className='logout-link' onClick={logoutHandler}>
                 <ImExit className='icon'/>
                 <span className='title'><h3>Sing Out</h3></span>
              </Link>
            </div>
            
            </div>
    </div>)}
    </>
  )
}

export default Sidebar
