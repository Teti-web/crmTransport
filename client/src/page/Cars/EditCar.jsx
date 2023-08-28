import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import Forms from '../../components/Forms/Forms';
import Input from '../../components/Forms/Input';
import Button from '../../components/Buttons/Button'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import {ToastContainer, toast} from'react-toastify'


const EditCar = () => {
    const carId = useParams().id;
    const {request}=useHttp();
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        car_brand:'',model:'', registration:'', vin:'', insurance:'', end_insurance:'', overview:'', end_overview:''
      });
    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const getCarData = useCallback(async()=>{
      try {
        const dataCar = await request(`/api/cars/getcar/${carId}`, 'GET', null,{
          Authorization: `Bearer ${token}`
       })
       setForm(dataCar);
      } catch (e) {}
    },[token,carId, request])

    const updateCar = async (e) =>{
      e.preventDefault();
    try {
        const formData = {
          car_brand: form.car_brand,
          model: form.model,
          registration:form.registration, 
          vin:form.vin, 
          insurance:form.insurance, 
          end_insurance: form.end_insurance, 
          overview: form.overview, 
          end_overview: form.end_overview
        };

        const data = await request(`/api/cars/updatecar/${carId}`, 'PATCH', formData);
        toast.success("Car updated");
        navigate("/cars");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }
  

    useEffect(() => {
      getCarData()
    }, [getCarData]);

console.log("Car id", carId);
  return (
    <section className='section'>
        <Sidebar/>
        <div className='main'>
          <Topbar title='Edit car'/>
          <ToastContainer/>
          <div className='edit-container'>
            <div className='info-item'><p>Car brand</p><input type='text' name='car_brand' value={form?.car_brand}  onChange={changeHandler}/></div>
              <div className='info-item'><p>Model</p> <input type='text' value={form?.model}name='model' onChange={changeHandler}/></div>
             <div className='info-item'><p>Number registration'</p><input type='text' name='registration'  value={form?.registration} onChange={changeHandler}/></div>
              <div className='info-item'><p>Number VIN</p><input type='text' name='vin' value={form?.vin} onChange={changeHandler}/></div>
              <div className='info-item'><p>Insurance</p><input type='text' name='insurance'value={form?.insurance}onChange={changeHandler}/></div>
              <div className='info-item'><p>End insurance</p><input type='date' name='end_insurance'onChange ={changeHandler}/></div>
              <div className='info-item'><p>Overview</p><input type='text' name='overview'onChange={changeHandler}/></div>
              <div className='info-item'><p>End overview'</p><input type='date' name='end_overview' onChange={changeHandler}/></div>
            <Button classCSS='task-btn' buttonOnClick={updateCar}  buttonTitle='Update' />
            </div>
        </div>
    </section>
  )
}

export default EditCar
