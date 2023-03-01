import React,{useState, useCallback, useEffect,useMemo, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './selectdate.scss'



const SelectClient = (props) => {
    const [clientItem, setClient] = useState([]);
    const {token} = useContext(AuthContext);
    const {request}= useHttp();
    const getClientData = useCallback( async () =>{
        try {
          const dataClient = await request('api/clients/getall', 'GET', null)
         setClient(dataClient);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
        getClientData()
    }, [getClientData]);

    const clientData = useMemo(()=> clientItem);

    const optionsClient= clientData.map((item)=>{
        return(
            <option key={item._id} value={item.name}>
                     {item.name}
            </option>
        )
    })
  return (
    <div className='select-container'>
        <label htmlFor='Select client'>Select client</label>
        <select name="client"onChange={props.change}>
            {optionsClient}
        </select>
    </div>
  )
}

export default SelectClient