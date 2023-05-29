import React,{useState, useCallback, useEffect, useContext} from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useHttp } from '../../hooks/http.hook';
import Button from '../../components/Buttons/Button';
import { ToastContainer, toast } from 'react-toastify';
import Forms from '../../components/Forms/Forms';
import Input from '../../components/Forms/Input';
import Modal from '../../components/Modal/Modal';
import CarTable from '../../components/TableComponents/CarTable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AuthContext } from '../../context/AuthContext';

const Cars = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [formKey, setFormKey]= useState(1);
  const {request}= useHttp();
  const {token} = useContext(AuthContext);
  const [form, setForm] = useState({
    car_brand:'',model:'', registration:'', vin:'', insurance:'', end_insurance:'', overview:'', end_overview:''
  });
  const [cars, setCars] = useState([]);
   const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})
   }

   const addHandler = async () => {
    try {
      const data = await request('/api/cars/addcar', 'POST', {...form})
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

  const getCarsData = useCallback( async () =>{
    try {
      const dataCars = await request('api/cars/getall', 'GET', null,{
        Authorization: `Bearer ${token}`
     })
     setCars(dataCars);
    } catch (e) {}
  
},[token,request])
useEffect(() => {
  getCarsData()
}, [getCarsData]);
  const[fileName,setFileName]=useState("Reports");
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const downloadFile = () => {
    const ws = XLSX.utils.json_to_sheet(cars);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], {type: fileType});
     FileSaver.saveAs(data, fileName + fileExtension);
  }
  return (
    <section className=' section'>
    <Sidebar/>

     <div className='main'>
      <Topbar title='Cars'/>

      <div className='main-container center'>
      <div className='table-container'>
            <div className='table-header'>
              <Button classCSS='btn'
              buttonTitle='Add car'
              buttonOnClick={()=>setmodalActive(true)}/>
              <Button classCSS='btn'
              buttonTitle='Download cars data'
              buttonOnClick={(e) => downloadFile()}/>
            </div>
            <CarTable/>
          </div>
      </div>

      <Modal active={modalActive} setActive={setmodalActive}>
          <ToastContainer/>
             <h3 className='modal_title'>Add new car</h3>
            <Forms nameButton='Send' key={formKey}>
              <Input typeInput='text' nameInput='car_brand' nameLabel='Car brand'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='model' nameLabel='Model'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='registration' nameLabel='Number registration'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='vin' nameLabel='Number VIN'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='insurance' nameLabel='Insurance'onChangeInput={changeHandler}/>
              <div className='input-date translatex'>
                <span>End insurance</span>
              <Input typeInput='date' nameInput='end_insurance' nameLabel=''onChangeInput={changeHandler}/>
              </div>
              <Input typeInput='text' nameInput='overview' nameLabel='Overview'onChangeInput={changeHandler}/>
              <div className='input-date translatex'>
                <span>End Overview</span>
              <Input typeInput='date' nameInput='end_overview' nameLabel=''onChangeInput={changeHandler}/>
              </div>
            </Forms>
            <Button classCSS='btn btn-form' buttonTitle='Send' buttonOnClick={addHandler}/>
          </Modal>

     </div>
  </section>
  )
}

export default Cars
