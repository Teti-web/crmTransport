import React,{useState, useCallback, useEffect,useMemo, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './selectdate.scss'

const SelectCar = (props) => {
    const [carItem, setCar] = useState([]);
    const {token} = useContext(AuthContext);
    const {request}= useHttp();
    const getCarData = useCallback( async () =>{
        try {
          const dataCar = await request('api/cars/getall', 'GET', null)
         setCar(dataCar);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
        getCarData()
    }, [getCarData]);

    const carData = useMemo(()=> carItem);

    const optionsCar = carData.map((item)=>{
        return(
            <option key={item._id} value={item.registration}>
                     {item.registration}
            </option>
        )
    })
  return (
    <div className='select-container'>
    <label htmlFor='Select driver'>Select car</label>
    <select name="car"onChange={props.change}>
        {optionsCar}
    </select>
</div>
  )
}

export default SelectCar