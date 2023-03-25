import React, {useEffect, useState, useRef, useCallback, useContext, useMemo} from 'react';
import { Link, useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment'
import Modal from '../Modal/Modal';
import Forms from '../Forms/Forms';
import Input from '../Forms/Input';
import {toast, ToastContainer} from 'react-toastify'
import Button from '../Buttons/Button';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';


const CalendarComponents = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [modalRem, setmodalRem] =useState(false);
  const [formKey, setFormKey]= useState(1);
  const {request}= useHttp();
  const {token} = useContext(AuthContext);
  const [events,setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [eventID, setEventID] = useState("");
  const [form, setForm] = useState({
    title:'', start:'', end:''
  });

  const [infoEvent,setInfoEvent] = useState({
    title:'', start:'', end:''
  })
  
  const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})
   }
  const openModal = ()=>{
    setmodalActive(true);
  }

  const onEventAdded = event =>{
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addHandler(event);
  }

  const onEventClicked =(info)=>{
    setmodalRem(true);
    const id = info.event.extendedProps._id.toString();
    getEventClicked(id);
    setEventID(id);

  }
 const getEventClicked = useCallback(async (id) =>{
  try {
    const data = await request(`/api/events/getevent/${id}`, 'GET', null,{
      Authorization: `Bearer ${token}`
    }) 
    setInfoEvent(data)
  } catch (e) {}
 })



  const addHandler = useCallback(async () => {
    try {
      const data = await request(`/api/events/addevent`, 'POST', {...form})
      toast.success("Successfully");
    } catch (error) {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
    setFormKey(formKey+1);
  })

  const getEventData = useCallback( async (data) =>{
    try {
      const dataEvent = await request(`api/events/getevents?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`,
      'GET', null, {
        Authorization: `Bearer ${token}`
      })
     setEvents(dataEvent);
    } catch (e) {}
  
},[token, request])

 useEffect(() => {
  getEventData();
}, [getEventData]);



  return (<>
  <div className='calendar-container'>
 <FullCalendar
   plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
   initialView="dayGridMonth"
   headerToolbar={{center: 'dayGridMonth,timeGridWeek,timeGridDay,newEvents'}}
   customButtons={{
    newEvents:{
       text:'new event',
       click: openModal,
    },
   }}
   eventTimeFormat={{ // like '14:30'
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
   }}
   businessHours= {{
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [ 1, 2, 3, 4, 5 ], 
    startTime: '9:00', 
    endTime: '17:00',
  }}
  slotLabelFormat={{
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }}
   nowIndicator
   timeZone='local'
   firstDay={1}
   ref={calendarRef}
   events={events}
   eventAdd={(event) => onEventAdded(event)}
   datesSet={(data)=>getEventData(data)}
   eventClick={(info)=>onEventClicked(info)}
     />
   </div>
    <Modal active={modalActive} setActive={setmodalActive} onEventAdded={(event)=>onEventAdded(event)}>
      <ToastContainer/>
      <h3 className='modal_title'>Add new event</h3>
     <Forms key={formKey}>
          
          <Input typeInput='text' nameInput='title' nameLabel='Title'onChangeInput={changeHandler}/>
          <div className='input-date'>
            <span>Start</span>
          <Input typeInput='datetime-local' nameInput='start' nameLabel=''onChangeInput={changeHandler}/>
          </div>
          <div className='input-date '>
            <span>End</span>
          <Input typeInput='datetime-local' nameInput='end' nameLabel=''onChangeInput={changeHandler}/>
          </div>
     </Forms>
     <Button classCSS='btn btn-form' buttonTitle='Send' buttonOnClick={addHandler}/>
   </Modal>
   
   <Modal active={modalRem} setActive={setmodalRem} >
      <h3 className='modal_title'>Event</h3>
      <div className='center'>
      <p className='text-modal'>{infoEvent.title}</p>
      <p className='text-modal'>{moment(infoEvent.start).format('H:mm MMM DD YYYY  ')}</p>
      <p className='text-modal'>{moment(infoEvent.end).format('H:mm MMM DD YYYY  ')}</p>
      </div>
      <div>
        <Link className='btn' to={`/event-edit/${eventID}`}>Update</Link>
      </div>
   </Modal>
 </>)
}

export default CalendarComponents