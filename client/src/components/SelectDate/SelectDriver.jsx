import React,{useState, useCallback, useEffect,useMemo, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './selectdate.scss'

const SelectDriver = (props) => {
    const [driverItem, setDriver] = useState([]);
    const {token} = useContext(AuthContext);
    const {request}= useHttp();
    const getDriverData = useCallback( async () =>{
        try {
          const dataDriver = await request('/api/drivers/getall', 'GET', null)
         setDriver(dataDriver);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
      getDriverData()
    }, [getDriverData]);

    const driverData = useMemo(()=> driverItem);

    const optionsDriver = driverData.map((item)=>{
        return(
            <option key={item._id} value={item.name}>
                     {item.name}
            </option>
        )
    })
  return (
    <div className='select-container'>
        <label htmlFor='Select driver'>Select driver</label>
        <select name="driver"onChange={props.change}>
            {optionsDriver}
        </select>
    </div>
  )
}

export default SelectDriver