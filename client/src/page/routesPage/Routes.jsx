import React, {useState, useContext, useEffect, useCallback} from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/Buttons/Button';
import { useHttp } from '../../hooks/http.hook';
import {toast, ToastContainer} from 'react-toastify';
import Modal from '../../components/Modal/Modal';
import Forms from '../../components/Forms/Forms';
import Input from '../../components/Forms/Input';
import { AuthContext } from '../../context/AuthContext';
import SelectDriver from '../../components/SelectDate/SelectDriver';
import RouteTable from '../../components/TableComponents/RouteTable';
import SelectCar from '../../components/SelectDate/SelectCar';
import SelectClient from '../../components/SelectDate/SelectClient';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Routes = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [formKey, setFormKey]= useState(1);
  const {token} = useContext(AuthContext);
  const {request}= useHttp();
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    name:'',start:'', start_date:'', finish:'', finish_date:'', price:'', driver:'', car:'', client:''
  });

   const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})

   }

   const addHandler = async () => {
    try {
      const data = await request('/api/routes/addroute', 'POST', {...form})
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
  const getRoutesData = useCallback( async () =>{
    try {
      const dataRoutes = await request('api/routes/getall', 'GET', null,{
        Authorization: `Bearer ${token}`
     })
     setRoutes(dataRoutes);
    } catch (e) {}
  
},[token,request])
useEffect(() => {
  getRoutesData()
}, [getRoutesData]);
  const[fileName,setFileName]=useState("Reports");
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const downloadFile = () => {
    const ws = XLSX.utils.json_to_sheet(routes);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], {type: fileType});
     FileSaver.saveAs(data, fileName + fileExtension);
  }
  return (
    <section className=' section'>
    <Sidebar/>

     <div className='main'>
      <Topbar title='Routes'/>

      <div className='main-container center'>
      <div className='table-container'>
            <div className='table-header'>
              <Button classCSS='btn'
              buttonTitle='Add route'
              buttonOnClick={()=>setmodalActive(true)}/>
              <Button classCSS='btn'
              buttonTitle='Download routes data'
              buttonOnClick={(e) => downloadFile()}/>
            </div>
            <RouteTable/>
          </div>
      </div>

      <Modal active={modalActive} setActive={setmodalActive}>
          <ToastContainer/>
             <h3 className='modal_title'>Add new route</h3>
            <Forms nameButton='Send' key={formKey}>
              <Input typeInput='text' nameInput='name' nameLabel='Name route'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='start' nameLabel='Start city'onChangeInput={changeHandler}/>
              <div className='input-date translatex'>
                <span>Start date</span>
              <Input typeInput='date' nameInput='start_date' nameLabel=''onChangeInput={changeHandler}/>
              </div>
              <Input typeInput='text' nameInput='finish' nameLabel='Finish city'onChangeInput={changeHandler}/>
              <div className='input-date translatex'>
                <span>Finish date</span>
              <Input typeInput='date' nameInput='finish_date' nameLabel=''onChangeInput={changeHandler}/>
              </div>
              <Input typeInput='number' nameInput='price' nameLabel='Price'onChangeInput={changeHandler}/>
              <SelectDriver change={changeHandler}/>
              <SelectCar change={changeHandler}/>
              <SelectClient change={changeHandler}/>
            </Forms>
            <Button classCSS='btn btn-form' buttonTitle='Send' buttonOnClick={addHandler}/>
          </Modal>

     </div>
  </section>
  )
}

export default Routes