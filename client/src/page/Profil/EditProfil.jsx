import React, {useContext, useState, useCallback, useEffect} from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import './profil.scss'
import {ToastContainer, toast} from'react-toastify'
import Loader from './../../components/loader/Loader'

const EditProfil = () => {
  const {request}=useHttp();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const {token} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  
    const [profile, setProfile] = useState({
      name:'', bio: '', tel:''
    });
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

  const changeProfie = event=>{
    setProfile({...profile, [event.target.name]:event.target.value})
  }
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      // Handle Image upload
      let imageURL;
      setIsLoading(true);
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dvq2ppyef");
        image.append("upload_preset", "jpcfm43r");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dvq2ppyef/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        // Save Profile
        const formData = {
          name: profile.name,
          tel: profile.tel,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await request(`api/users/updateuser`, 'PATCH', formData);
        toast.success("User updated");
        navigate("/profil");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className = 'profile section'>
      {isLoading && <Loader />}
      <Sidebar/>
    <div className='main'>
      <ToastContainer/>
       <Topbar title='Edit profile'/>

       <div className='profile-inner'>
       <div className='profile-img'>
        <img src={imagePreview}/>
        <input type="file" name='photo' accept="image/png, image/jpeg ,image/jpg" onChange={handleImageChange}/>
        <span>The size of the photo must be &#8806; 10MB</span>
       </div>
       <div className='profile-info'>
          <div className='info-item'><p>Full name:</p> <input type="text" name='name' value={profile?.name} onChange={changeProfie}/></div>
          <div className='info-item'><p>Telephone:</p> <input type="text" name="tel" value={profile?.tel} onChange={changeProfie}/></div>
          <div className='info-item'><p>BIO:</p>  <input type="text" name='bio' value={profile?.bio} onChange={changeProfie} /></div>
          <button className='task-btn' onClick={saveProfile} >Update</button>
         </div>
      
       </div>
    </div>
    
    </div>
  )
}

export default EditProfil
