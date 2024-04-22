import React, { useState } from 'react';
import '../../styles/taskPage.css';

const AddTask = ({ onAdd }) => {
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      onAdd(taskInput);
      setTaskInput('');
    }
  };

  return (
    <div className="add-task-container float-right pr-10 flex items-center">
      <input
        type="text"
        value={taskInput}
        onChange={handleTaskInputChange}
        className="add-task-input appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Enter task..."
      />
      <button
        onClick={handleAddTask}
        className="add-task-button py-2 px-4 rounded shadow-md flex-shrink-0"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
