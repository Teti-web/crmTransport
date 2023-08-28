import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from'react-toastify'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Button from '../../components/Buttons/Button'

const DetailClients = () => {

    const clientId = useParams().id;
    const {request}=useHttp();
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name:'',email:'', tel:'', adress:'', bio: ''
      });
    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const getClientsData = useCallback(async()=>{
      try {
        const dataClient = await request(`/api/clients/getclient/${clientId}`, 'GET', null,{
          Authorization: `Bearer ${token}`
       })
       setForm(dataClient);
      } catch (e) {}
    },[token,clientId, request])

    const updateClients = async (e) =>{
      e.preventDefault();
    try {
        const formData = {
            name: form.name,
            email: form.email,
            tel: form.tel,
            adress: form.adress,
            bio: form.bio
        };

        const data = await request(`/api/clients/updateclient/${clientId}`, 'PATCH', formData);
        toast.success("Client updated");
        navigate("/clients");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }
  

    useEffect(() => {
      getClientsData()
    }, [getClientsData]);
  return (
    <section className='section'>
    <Sidebar/>
    <div className='main'>
      <Topbar title={form.name}/>
      <ToastContainer/>
      <div className='edit-container'>
        <div className='info-item'><p>Name</p><input type='text' name='name' value={form?.name}  onChange={changeHandler}/></div>
          <div className='info-item'><p>Email</p> <input type='email' value={form?.email}name='email' onChange={changeHandler}/></div>
         <div className='info-item'><p>Phone number</p><input type='text' name='tel'  value={form?.tel} onChange={changeHandler}/></div>
          <div className='info-item'><p>Adress</p><input type='text' name='adress' value={form?.adress} onChange={changeHandler}/></div>
          <div className='info-item'><p>Bio:</p><textarea type='text' name='bio' value={form?.bio} onChange={changeHandler}/></div>
        <Button classCSS='task-btn' buttonOnClick={updateClients}  buttonTitle='Update' />
        </div>
    </div>
</section>
  )
}

export default DetailClients
