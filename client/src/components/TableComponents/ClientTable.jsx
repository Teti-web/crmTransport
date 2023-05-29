import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import {useGlobalFilter, useSortBy,useTable} from 'react-table';
import {COLUMNS} from './Columns/ColumnClients'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import {FaSortDown} from 'react-icons/fa';
import {FaSortUp} from 'react-icons/fa';
import './table.components.scss'
import GlobalFilter from './GlobalFilter';
import {Link} from 'react-router-dom'

const ClientTable = () => {
    const {request}=useHttp();
    const {token} = useContext(AuthContext);
    const columns = useMemo(() => COLUMNS, []);
    const [client, setClient] = useState([]);

    const getClientData = useCallback( async () =>{
        try {
          const dataClient = await request('api/clients/getall', 'GET', null,{
            Authorization: `Bearer ${token}`
         })
         setClient(dataClient);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
      getClientData()
    }, [getClientData]);

    const data = useMemo(()=> client);
    
    const tableInstance= useTable({
       columns,
       data
    },
    useGlobalFilter, 
    useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <td><Link className='task-btn' to={`/profitclient/${row.original._id}`}>Detail</Link></td>
              </tr>
            )
          })}
        </tbody>
         </table>
    </div>
    </>
  )
}

export default ClientTable