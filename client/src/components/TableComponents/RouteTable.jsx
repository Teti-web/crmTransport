import React,{useContext, useMemo, useState,useCallback, useEffect} from 'react';
import {useGlobalFilter, useSortBy,useTable} from 'react-table';
import {COLUMNS} from './Columns/ColumnRoute';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import {FaSortDown} from 'react-icons/fa';
import {FaSortUp} from 'react-icons/fa';
import './table.components.scss'
import GlobalFilter from './GlobalFilter';
import { Link } from 'react-router-dom';

const RouteTable = () => {
    const {request}=useHttp();
    const {token} = useContext(AuthContext);
    const columns = useMemo(() => COLUMNS, []);
    const [route, setRoute] = useState([]);

    const getRouteData = useCallback( async () =>{
        try {
          const dataRoute = await request('api/routes/getall', 'GET', null,{
            Authorization: `Bearer ${token}`
         })
         setRoute(dataRoute);
        } catch (e) {}
      
    },[token,request])
    
     useEffect(() => {
      getRouteData()
    }, [getRouteData]);

    const data = useMemo(()=> route);
    
    
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
                <td><Link className='task-btn' to={`/editroute/${row.original._id}`}>Edit</Link></td>
              </tr>
            )
          })}
        </tbody>
         </table>
    </div>
    </>
  )
}

export default RouteTable