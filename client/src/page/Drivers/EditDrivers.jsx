import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from'react-toastify'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Button from '../../components/Buttons/Button'

const EditDrivers = () => {
    const driverId = useParams().id;
    const {request}=useHttp();
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name:'',email:'', tel:'', date_of_birth:'', category:''
      });
    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const getDriverData = useCallback(async()=>{
      try {
        const dataDriver = await request(`/api/drivers/getdriver/${driverId}`, 'GET', null,{
          Authorization: `Bearer ${token}`
       })
       setForm(dataDriver);
      } catch (e) {}
    },[token,driverId, request])

    const updateDriver = async (e) =>{
      e.preventDefault();
    try {
        const formData = {
            name: form.name,
            email: form.email,
            tel: form.tel,
            date_of_birth: form.date_of_birth,
            category: form.category
        };

        const data = await request(`/api/drivers/updatedriver/${driverId}`, 'PATCH', formData);
        toast.success("Client updated");
        navigate("/drivers");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }
  

    useEffect(() => {
        getDriverData()
    }, [getDriverData]);
  return (
    <section className='section'>
    <Sidebar/>
    <div className='main'>
      <Topbar title='Edit driver'/>
      <ToastContainer/>
      <div className='edit-container'>
        <div className='info-item'><p>Name</p><input type='text' name='name' value={form?.name}  onChange={changeHandler}/></div>
          <div className='info-item'><p>Email</p> <input type='email' value={form?.email} name='email' onChange={changeHandler}/></div>
         <div className='info-item'><p>Phone number</p><input type='text' name='tel'  value={form?.tel} onChange={changeHandler}/></div>
          <div className='info-item'><p>Date of birth</p><input type='date' name='date_of_birth' value={form?.date_of_birth} onChange={changeHandler}/></div>
          <div className='info-item'><p>Category</p><input type='text' name='category'  value={form?.category} onChange={changeHandler}/></div>
        <Button classCSS='task-btn' buttonOnClick={updateDriver}  buttonTitle='Update' />
        </div>
    </div>
</section>
  )
}

export default EditDrivers
