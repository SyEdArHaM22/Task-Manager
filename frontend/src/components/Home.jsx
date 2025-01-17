import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTasks(result.data))
      .catch(error => console.log(error));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, { task: editTaskValue })
      .then(() => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === id ? { ...task, task: editTaskValue } : task
          )
        );
        setEditTaskId(null); // Reset edit mode
        setEditTaskValue(''); // Clear input field
      })
      .catch(error => console.log(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="home">
      <h2>Task Manager</h2>
      <Create />
      {
        tasks.length === 0
          ? (
            <div><h2>No Record Found</h2></div>
          ) : (
            tasks.map(task => (
              <div className="task" key={task._id}>
                <div className='task-content'>
                  {
                    task._id === editTaskId
                      ? (
                        <>
                          <input
                            type="text"
                            value={editTaskValue}
                            onChange={(e) => setEditTaskValue(e.target.value)}
                            placeholder="Update task"
                          />
                          <button onClick={() => handleEdit(task._id)}>Save</button>
                        </>
                      )
                      : (
                        <p>{task.task}</p>
                      )
                  }
                </div>
                <div className='icons'>
                  <span>
                    <BsPencilSquare
                      className="icons edit-icon"
                      onClick={() => {
                        setEditTaskId(task._id);
                        setEditTaskValue(task.task);
                      }}
                    />
                  </span>
                  <span>
                    <BsTrashFill
                      className="icons delete-icon"
                      onClick={() => handleDelete(task._id)}
                    />
                  </span>
                </div>
              </div>
            ))
          )
      }
    </div>
  );
};

export default Home;


