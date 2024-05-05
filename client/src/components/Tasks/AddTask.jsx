import React, { useState } from 'react';
import '../../styles/taskPage.css';

const AddTask = ({ onAdd }) => {
  
  const handleAddTask = () => {
    onAdd()
  };

  return (
    <div className="add-task-container float-right pr-10 flex items-center">
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
