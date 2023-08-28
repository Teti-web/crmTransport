import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from'react-toastify'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Button from '../../components/Buttons/Button'
import SelectCar from '../../components/SelectDate/SelectCar';
import SelectDriver from '../../components/SelectDate/SelectDriver';
import SelectClient from '../../components/SelectDate/SelectClient';

const EditRoute = () => {
    const routeId = useParams().id;
    const {request}=useHttp();
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name:'',start:'', start_date:'', finish:'', finish_date:'', price:'', driver:'', car:'', client:''
      });
    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const getRouteData = useCallback(async()=>{
      try {
        const dataRoute = await request(`/api/routes/getroute//${routeId}`, 'GET', null,{
          Authorization: `Bearer ${token}`
       })
       setForm(dataRoute);
      } catch (e) {}
    },[token,routeId, request])

    const updateRoute = async (e) =>{
      e.preventDefault();
    try {
        const formData = {
            name: form.name,
            start: form.start,
            start_date: form.start_date,
            finish: form.finish,
            finish_date: form.finish_date,
            price: form.price,
            driver: form.driver,
            car: form.car,
            client: form.client
        };

        const data = await request(`/api/routes/updateroute/${routeId}`, 'PATCH', formData);
        toast.success("Client updated");
         navigate("/routes");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }
  

    useEffect(() => {
        getRouteData()
    }, [getRouteData]);
  return (
    <section className='section'>
    <Sidebar/>
    <div className='main'>
      <Topbar title='Edit route'/>
      <ToastContainer/>
      <div className='edit-container'>
        <div className='info-item'><p>Name route</p><input type='text' name='name' value={form?.name}  onChange={changeHandler}/></div>
          <div className='info-item'><p>Start city</p> <input type='text' value={form?.start}name='start' onChange={changeHandler}/></div>
         <div className='info-item'><p>Start date</p><input type='date' name='start_date'  value={form?.start_date} onChange={changeHandler}/></div>
          <div className='info-item'><p>Finish city</p><input type='text' name='finish' value={form?.finish} onChange={changeHandler}/></div>
          <div className='info-item'><p>Finish date</p><input type='date' name='finish_date'  value={form?.finish_date} onChange={changeHandler}/></div>
          <div className='info-item'><p>Price</p><input type='text' name='price' value={form?.price} onChange={changeHandler}/></div>
          <SelectDriver change={changeHandler}/>
          <SelectCar change={changeHandler}/>
          <SelectClient change={changeHandler}/>
         
        <Button classCSS='task-btn' buttonOnClick={updateRoute}  buttonTitle='Update' />
        </div>
    </div>
</section>
  )
}

export default EditRoute
