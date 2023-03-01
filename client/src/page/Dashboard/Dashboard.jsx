import React, { useState,useCallback,useEffect } from 'react';
import './dashboard.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import BoxNumber from '../../components/BoxNumber/BoxNumber';
import { useHttp } from '../../hooks/http.hook';
import Task from '../../components/TaskComponents/Task';
import Chart from '../../components/Chart/Chart';



const Dashboard = () => {
  const {request}= useHttp();
  const [countDriver, setCountDriver] = useState('');
  const [countClient, setCountClient] = useState('');
  const [countCar, setCountCar] = useState('');
  const [countRoute, setCountRoute] = useState('');

  const coutHandler = useCallback( async () => {
    try {
      const data = await request('/api/drivers/getcount', 'GET', null)
      setCountDriver(data);
    } catch (error) {}
  },[request])
  useEffect(() => {
    coutHandler()
  }, [coutHandler]);


  const getcoutClients = useCallback( async () => {
    try {
      const data = await request('/api/clients/getcount', 'GET', null)
      setCountClient(data);
    } catch (error) {}
  },[request])
  useEffect(() => {
    getcoutClients()
  }, [getcoutClients]);

  const getcountCar = useCallback( async () => {
    try {
      const data = await request('/api/cars/getcount', 'GET', null)
      setCountCar(data);
    } catch (error) {}
  },[request])
  useEffect(() => {
    getcountCar()
  }, [getcountCar]);

  const getcountRoute = useCallback( async () => {
    try {
      const data = await request('/api/routes/getcount', 'GET', null)
      setCountRoute(data);
    } catch (error) {}
  },[request])
  useEffect(() => {
    getcountRoute()
  }, [getcountRoute]);

  return (
  <section className='dashboard section'>
    <Sidebar/>

     <div className='main'>
      <Topbar title='Dashboard'/>

      <div className='main-container'>
        <div className='main-other'>
        <div className="flex">
         <BoxNumber
         link ='/cars'
         title='Cars'
         number={countCar}/>
          <BoxNumber
         link ='/clients'
         title='Clients'
         number={countClient}/>
          <BoxNumber
         link ='/routes'
         title='Routes'
         number={countRoute}/>
          <BoxNumber
         link ='/drivers'
         title='Drivers'
         number={countDriver}/>
        </div>
        <div className='main-inner flex'>
          <div className="inner-item">
          <div className='chart-container'>
            <Chart/>
          </div>
          <div className='task-container'>
            <Task/>
          </div>
          </div>
          <div className="inner-item">
             
          </div>
        </div>
      </div>
      </div>
     </div>
  </section>
  )
}

export default Dashboard
