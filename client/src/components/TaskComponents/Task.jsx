import React, { useState, useEffect } from 'react'
import './task.component.scss'
import { useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';



const Task = () => {
    const {request, token} = useHttp();
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [form, setForm] = useState({
     title:'', priority:'', status:''
    })


    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    
       }


    //add tasks
    const addTask = async ()=>{
        try {
            const data = await request(`/api/tasks/addtask`, 'POST', {...form},{
              Authorization: `Bearer ${token}`
            })
            window.location.reload(false);
          } catch (error) {}
    };

    //get tasks
    const getTask = useCallback( async () => {
        try {
          const data = await request('/api/tasks/gettasks', 'GET', null,{
            Authorization: `Bearer ${token}`
          })
          setListItems(data);
        } catch (error) {}
      },[request,token])
      useEffect(() => {
        getTask()
      }, [getTask]);

      //update tasks

      const updateTask =  async () => {
        try {
            const data = await request(`/api/tasks/updatetask/${isUpdating}`, 'PUT', {...form},{
              Authorization: `Bearer ${token}`
            })
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            const updatedItem = listItems[updatedItemIndex].item = form;
          } catch (error) {}
      }

      //delete tasks

      const deleteTask = async (id) => {
        try {
            const data = await request(`/api/tasks/removetask/${id}`, 'PATCH',null,{
                Authorization: `Bearer ${token}`
              })
              const newListItems = listItems.filter(item=> item._id !== id);
              setListItems(newListItems);

          } catch (error) {}
      }

      const renderUpdateForm = () => (
    <form className="update-form" onSubmit={updateTask} >
      <input className="update-new-input" type="text" name='title' placeholder="New Item" value={isUpdating.title}  onChange={changeHandler} />
      <div className='select-container'>
                    <select name="priority" defaultValue={form.priority} onChange={changeHandler} >
                        <option value="critical">critical</option>
                        <option value="high">high</option>
                        <option value="normal">normal</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div className='select-container'>
                    <select name="status" defaultValue={form.status}  onChange={changeHandler}>
                        <option value="to do">to do</option>
                        <option value="in progress">in progress</option>
                        <option value="blocked">blocked</option>
                        <option value="done">done</option>
                    </select>
                </div>
      <button className="task-btn" type="submit">Update</button>
    </form>
  )
  return (
    <div className='task'>
            <div className='task-form'  >
                <div className='input-container'>
                <input type='text' name='title' className='task-input' onChange={changeHandler} />
                <label>Input to do</label>
                </div>
                <div className='select-container'>
                    <label htmlFor="">
                        Pick a priority:
                    <select name="priority" defaultValue='normal' onChange={changeHandler} >
                        <option value="critical">critical</option>
                        <option value="high">high</option>
                        <option value="normal">normal</option>
                        <option value="low">low</option>
                    </select>
                    </label>
                </div>
                <div className='select-container'>
                    <label htmlFor="">
                        Pick a status:
                    <select name="status" defaultValue='to do' onChange={changeHandler}>
                        <option value="to do">to do</option>
                        <option value="in progress">in progress</option>
                        <option value="blocked">blocked</option>
                        <option value="done">done</option>
                    </select>
                    </label>
                </div>
               <button className='task-btn'  onClick={addTask}>Add</button>
            </div>

            <div className="task-listItems">
        {
          listItems.map(item => (
          <div className="task-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content">{item.title}</p>
                  <p className="item-context">{item.priority}</p>
                  <p className="item-context">{item.status}</p>
                  <div>
                  <button className="btn-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="btn-item" onClick={()=>{deleteTask(item._id)}}>Delete</button>
                  </div>
                </>
            }
            
          </div>
          ))
        }
        

      </div>
    </div>
  )
}

export default Task