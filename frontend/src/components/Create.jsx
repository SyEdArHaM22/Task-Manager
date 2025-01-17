import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState();
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
            location.reload()
        })
        .catch(error => console.log(error))
    }
  return (
    <div className='create_from'>
        <input type='text' name='' id='' placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}/>
        <button type='button' onClick={handleAdd}>ADD</button> 
    </div>
  );
};

export default Create;