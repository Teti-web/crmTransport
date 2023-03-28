import React, {useContext,useCallback,useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
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

    const {eventID} = useParams();
       
  const getEventData = useCallback( async () =>{
    console.log(eventID);
    try {
      const dataEvent = await request(`/api/events/getevent/${eventID}`,
      'GET', null,{
        Authorization: `Bearer ${token}`
         })
     setForm(dataEvent);
    } catch (e) {}
   })

    const updateEvent = useCallback(async () =>{
        try {
          const data = await request(`/api/events/updatevent/${eventID}`, 'PATCH', null,{
            Authorization: `Bearer ${token}`
          }) 
          setForm(data)
        } catch (e) {}
       })
       useEffect(() => {
        getEventData();
      }, [getEventData]);
  return (
    <section className='calendar section'>
        <Sidebar/>
        <div className='main'>
          <Topbar title='Edit event'/>
           <div className='edit-form'>
            <p>Title :</p>
            <input type="text" name='title' value={form?.title}/>
           </div>
        </div>
    </section>    
  )
}

export default EditEvent
