import React, {useContext,useCallback,useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import moment from 'moment';
import './calendar.scss'

const EditEvent = () => {
    const {token} = useContext(AuthContext);
    const {request}= useHttp();
    const [form, setForm] = useState({
        title:'', start:'', end:''
      });
      const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
       }

    const eventID = useParams();
       
  const getEventData = useCallback( async () =>{
    console.log(eventID.id);
    try {
      const dataEvent = await request(`/api/events/getevent/${eventID.id}`,
      'GET', null,{
        Authorization: `Bearer ${token}`
         })
     setForm(dataEvent);
    } catch (e) {}
   },[token, request])

   useEffect(() => {
     getEventData();
  }, [getEventData]);

    const updateEvent = useCallback(async () =>{
        try {
          const data = await request(`/api/events/updatevent/${eventID.id}`, 'PATCH', null,{
            Authorization: `Bearer ${token}`
          }) 
          setForm(data)
        } catch (e) {}
       })

  return (
    <section className='calendar section'>
        <Sidebar/>
        <div className='main'>
          <Topbar title='Edit event'/>
           <div className='edit-form'>
            <div className='form-item'>
              <p>Title :</p>
              <input type="text" name='title' value={form?.title} onChange={changeHandler}/>
            </div>
            <div className='form-item'>
              <p>Start :</p>
              <input type='datetime-local' nameInput='start' value={form?.start} onChange={changeHandler}/>
            </div>
            <div className='form-item'>
              <p>End :</p>
              <input type='datetime-local' nameInput='end' value={form?.end} onChange={changeHandler}/>
            </div>

            <button className='btn-item' > Update</button>
           </div>
        </div>
    </section>    
  )
}

export default EditEvent
