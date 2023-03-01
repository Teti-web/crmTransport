import React from 'react'
import './calendar.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import CalendarComponents from '../../components/CalendarComponents/CalendarComponents';


const Calendar = () => {

  
  return (
    <section className='calendar section'>
        <Sidebar/>
        <div className='main'>
          <Topbar title='Calendar'/>
          <div className='main-container'>
           <CalendarComponents/>
          </div>
        </div>
    </section>
  )
}

export default Calendar
