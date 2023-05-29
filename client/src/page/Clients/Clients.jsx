import React, {useState, useCallback, useContext, useEffect} from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useHttp } from '../../hooks/http.hook';
import Button from '../../components/Buttons/Button';
import ClientTable from '../../components/TableComponents/ClientTable'
import { ToastContainer, toast } from 'react-toastify';
import Forms from '../../components/Forms/Forms';
import Input from '../../components/Forms/Input';
import Modal from '../../components/Modal/Modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AuthContext } from '../../context/AuthContext';

const Clients = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [formKey, setFormKey]= useState(1);
  const {token} = useContext(AuthContext);
  const {request}= useHttp();
  const [form, setForm] = useState({
    name:'',email:'', tel:'', adress:''
  });

  const [clients, setClients] = useState([]);

  const getClientsData = useCallback( async () =>{
      try {
        const dataClients = await request('api/clients/getall', 'GET', null,{
          Authorization: `Bearer ${token}`
       })
       setClients(dataClients);
      } catch (e) {}
    
  },[token,request])
  useEffect(() => {
    getClientsData()
  }, [getClientsData]);
  

  const[fileName,setFileName]=useState("Reports");
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const downloadFile = () => {
    const ws = XLSX.utils.json_to_sheet(clients);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], {type: fileType});
     FileSaver.saveAs(data, fileName + fileExtension);
  }

   const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})
   }

   const addHandler = async () => {
    try {
      const data = await request('/api/clients/addclient', 'POST', {...form})
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

  return (
    <section className=' section'>
    <Sidebar/>

     <div className='main'>
      <Topbar title='Clients'/>

      <div className='main-container center'>
      <div className='table-container'>
            <div className='table-header'>
              <Button classCSS='btn'
              buttonTitle='Add client'
              buttonOnClick={()=>setmodalActive(true)}/>
              <Button classCSS='btn'
              buttonTitle='Download clients'
              buttonOnClick={(e) => downloadFile()}/>
            </div>
            <ClientTable/>
          </div>
      </div>

      <Modal active={modalActive} setActive={setmodalActive}>
          <ToastContainer/>
             <h3 className='modal_title'>Add new client</h3>
            <Forms nameButton='Send' key={formKey}>
              <Input typeInput='text' nameInput='name' nameLabel='Name'onChangeInput={changeHandler}/>
              <Input typeInput='email' nameInput='email' nameLabel='Email'onChangeInput={changeHandler}/>
              <Input typeInput='tel' nameInput='tel' nameLabel='Phone number'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='adress' nameLabel='Adress'onChangeInput={changeHandler}/>
            </Forms>
            <Button classCSS='btn btn-form' buttonTitle='Send' buttonOnClick={addHandler}/>
          </Modal>
     </div>
  </section>
  )
}

export default Clients
