import React, {useState,useEffect } from 'react'
import '../Login/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const message = useMessage();
  const { error, request, clearError}= useHttp();
  const [formKey, setFormKey]= useState(1);
  const navigate = useNavigate();
  
  useEffect(()=>{
    message(error);
   clearError();
  }, [error, message, clearError]);

  const [form, setForm] = useState({
    name:'',email:'', tel:'', password:''
  });

   const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})
   }

   const registerHandler = async () => {
    try {
      const data = await request('/api/users/register', 'POST', {...form})
      navigate('/')
      toast.success("Successfully");
    } catch (error) {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
    setFormKey(formKey+1);
  }
  
  return (
    <section className='home'>
      <Navbar 
      link='/contact'
      nameLink='Contact Us'/>
      <ToastContainer/>
    <div id='register' className='forms' key={formKey}>
    <div className='face face-front'>
    <div className='content'>
      <h2>Sign Up</h2>
      <div className="field-wrapper">
        <input type='text' name="name" placeholder="name" onChange={changeHandler}required/>
        <label>name</label>
      </div>
      <div className="field-wrapper">
        <input type="email" name="email" placeholder="email"onChange={changeHandler}required/>
        <label>email</label>
      </div>
      <div className="field-wrapper">
        <input type="tel" name="tel" placeholder="tel" onChange={changeHandler}required/>
        <label>number phone</label>
      </div>
      <div className="field-wrapper">
        <input type="password" name="password" placeholder="password" onChange={changeHandler} required autocomplete="new-password"/>
        <label>password</label>
      </div>
      <div className="field-wrapper">
        <input type="button" value='Sign UP ' onClick={registerHandler}/>
      </div>
      <Link className="signin" to='/'>Already a user?  Sign in</Link>
    </div>
    </div>
</div>
</section>
  )
}

export default Register
