import React,{useState} from 'react';
import { useAsyncDebounce } from "react-table";
import {FiSearch} from 'react-icons/fi'
import './table.components.scss';

const GlobalFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter,}) => {
  
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div class="search-box">
     <button class="btn-search"><i class="fa-search"><FiSearch/></i></button>
     <input type="text" class="input-search" value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} placeholder="Type to Search..."/>
   </div>
  )
}

export default GlobalFilter