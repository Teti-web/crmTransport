import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import {useGlobalFilter, useSortBy,useTable} from 'react-table';
import {COLUMNS} from './Columns/ColumnCar'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import {FaSortDown} from 'react-icons/fa';
import {FaSortUp} from 'react-icons/fa';
import './table.components.scss'
import GlobalFilter from './GlobalFilter';
import { Link, useParams } from 'react-router-dom';
import Button from '../Buttons/Button';

const CarTable = () => {
    const {request}=useHttp();
    const {token} = useContext(AuthContext);
    const columns = useMemo(() => COLUMNS, []);
    const [car, setCar] = useState([]);
    const {id} = useParams(); 

    const getCarData = useCallback( async () =>{
        try {
          const dataCar = await request('api/cars/getall', 'GET', null,{
            Authorization: `Bearer ${token}`
         })
         setCar(dataCar);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
      getCarData()
    }, [getCarData]);

    const data = useMemo(()=> car);

    
    const tableInstance= useTable({
       columns,
       data
    },
    useGlobalFilter, 
    useSortBy,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
      }=tableInstance;

  return (
    <>
    <GlobalFilter 
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      globalFilter={state.globalFilter}/>
      <div className='table-other'>
        <table {...getTableProps()}>
         <thead>
            {headerGroups.map((headerGroup)=>(
               <tr {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map(column => (
                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')}
                 {/* Add a sort direction indicator */}
                 <span>
                   {column.isSorted
                     ? column.isSortedDesc
                       ? <FaSortDown/>
                       : <FaSortUp/>
                     : ''}
                 </span>
               </th>
              ))}
              </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return(
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                )})}
                <td><Link className='task-btn' to={`/editcar/${row.original._id}`}>Edit</Link></td>
              </tr>
            )
          })}
        </tbody>
         </table>
    </div>
    </>
  )
}

export default CarTable