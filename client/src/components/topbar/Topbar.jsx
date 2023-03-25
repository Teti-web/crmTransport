import React, { useState,useContext, useCallback, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {MdOutlineChat} from 'react-icons/md'
import {MdOutlineNotifications} from 'react-icons/md'
import './topbar.component.scss'
import { useHttp } from '../../hooks/http.hook';
import { useStateContext } from '../../context/ContextProvider'
import { AuthContext } from '../../context/AuthContext'


const Topbar = (props) => {
    const {request}=useHttp();
    const [profile, setProfile] = useState({
      name:'', photo: ''
    });
    const {token} = useContext(AuthContext);
    const {activeMenu, setActiveMenu} = useStateContext();

    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    
    const getUserData = useCallback( async () =>{
      try {
        const data = await request(`/api/users/getuser`, 'GET', null,{
      Authorization: `Bearer ${token}`
       })
       setProfile(data);
      } catch (e) {}
    
  },[token, request])

  useEffect(() => {
    getUserData()
  }, [getUserData])

    return (
    <div className='topbar'> 
         <div className='topbar-icon' onClick={handleActiveMenu}>
          <AiOutlineMenu />
         </div>
         <div className='topbar-title'>
            <h2>{props.title}</h2>
         </div>
         <div className='topbar-other'>
          <Link to='/profil'>
           <div className='user'>
            <div className='user-image'>
              <img src={profile?.photo} alt="" />
           </div> 
            <h3 className='user-name'>{profile?.name}</h3>
           </div>
          </Link>
        </div>
    </div>
  )
}

export default Topbar
