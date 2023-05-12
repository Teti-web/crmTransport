import React,{useState} from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BasicTable from '../../components/TableComponents/BasicTable';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal/Modal'
import Forms from '../../components/Forms/Forms';
import Input from '../../components/Forms/Input';
import { useHttp } from '../../hooks/http.hook';
import { ToastContainer, toast } from 'react-toastify';



const Drivers = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [formKey, setFormKey]= useState(1);
  const {request}= useHttp();
  const [form, setForm] = useState({
    name:'',email:'', tel:'', date_of_birth:'', category:''
  });

   const changeHandler = event =>{
    setForm({...form, [event.target.name]:event.target.value})
   }

   const addHandler = async () => {
    try {
      const data = await request('/api/drivers/adddrive', 'POST', {...form})
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
    <section className='drivers section'>
    <Sidebar/>

     <div className='main'>
      <Topbar title='Drivers'/>

      <div className='main-container center'>
      
          <div className='table-container'>
            <div className='table-header'>
              <Button classCSS='btn'
              buttonTitle='Create driver'
              buttonOnClick={()=>setmodalActive(true)}/>

            </div>
            <BasicTable/>
          </div>

          <Modal active={modalActive} setActive={setmodalActive}>
          <ToastContainer/>
             <h3 className='modal_title'>Add new driver</h3>
            <Forms nameButton='Send' key={formKey}>
              <Input typeInput='text' nameInput='name' nameLabel='Full name'onChangeInput={changeHandler}/>
              <Input typeInput='email' nameInput='email' nameLabel='Email'onChangeInput={changeHandler}/>
              <div className='input-date translatex'>
                <span>Date of birth</span>
              <Input typeInput='date' nameInput='date_of_birth' nameLabel=''onChangeInput={changeHandler}/>
              </div>
              <Input typeInput='tel' nameInput='tel' nameLabel='Phone number'onChangeInput={changeHandler}/>
              <Input typeInput='text' nameInput='category' nameLabel='Category'onChangeInput={changeHandler}/>
            </Forms>
            <Button classCSS='btn btn-form' buttonTitle='Send' buttonOnClick={addHandler}/>
          </Modal>
       
      </div>

     </div>
  </section>
  )
}

export default Drivers
