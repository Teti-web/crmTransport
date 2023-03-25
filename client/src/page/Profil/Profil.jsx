import React,{useCallback, useEffect, useState, useContext} from 'react'
import './profil.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Profil = () => {
  const {request}=useHttp();
    const [profile, setProfile] = useState({
      name:'', photo: '', bio: '', tel:''
    });
    const {token} = useContext(AuthContext);

  const getUserData = useCallback( async () =>{
    try {
      const data = await request(`api/users/getuser`, 'GET', null,{
    Authorization: `Bearer ${token}`
     })
     setProfile(data);
    } catch (e) {}
  
},[token, request])

useEffect(() => {
  getUserData()
}, [getUserData])
  return (
    <div className = 'profile section'>
      <Sidebar/>
    <div className='main'>
       <Topbar title='Profile'/>

      <div className='profile-inner'>
         <div className='profile-img'>
           <img src={profile.photo}/>
         </div>
         <div className='profile-info'>
          <div className='info-item'><p>Full name:</p> <p><b>{profile?.name}</b></p></div>
          <div className='info-item'><p>Telephone:</p> <p>{profile?.tel}</p></div>
          <div className='info-item'><p>BIO:</p> <p>{profile?.bio}</p></div>
          <Link className='task-btn' to='/profile-edit'>Edit</Link>
         </div>
      </div>

    </div>
    </div>
  )
}

export default Profil
