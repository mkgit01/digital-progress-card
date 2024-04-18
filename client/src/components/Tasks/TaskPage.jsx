import React, { useState } from 'react';

import AddTask from './AddTask';
import '../../styles/taskPage.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    const editedTask = prompt('Edit task:', tasks[index]);
    if (editedTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="task-page ">
      <main>
        <AddTask onAdd={handleAddTask} />
        {tasks.length === 0 ? (
          <div className="empty-state flex flex-row min-h-screen justify-center items-center ">
            <img src="/media/images/woman-sigh.png" alt="No tasks" className='no-task-img object-contain img-fluid size-1/4' />
            <p className='no-task text-2xl'>No tasks available. Start by adding one!</p>
          </div>
        ) : (
          <ul className="task-list overflow-auto p-10 w-3/5">
            {tasks.map((task, index) => (
              <div className='flex flex-col p-4'>
              <li key={index} className="task-item flex flex-auto p-4 justify-between">
                <span>{task}</span>
                <div className='task-buttons flex flex-row'>
                  <button onClick={() => handleEditTask(index)} className='mr-4'><img src='/media/images/edit.png' alt='Edit' className='size-10'/></button>
                  <button onClick={() => handleDeleteTask(index)}><img src='/media/images/delete.png' alt='Delete' className='size-10'/></button>
                </div>
              </li>
              </div>
            ))}
          </ul>
        )}
      </main>
      </div>
  );
};

export default TaskPage;
