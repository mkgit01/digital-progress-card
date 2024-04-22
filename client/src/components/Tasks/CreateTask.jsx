import React, { useState } from "react";
import "../../styles/createTask.css";

function CreateTask() {
  const [rewards, setRewards] = useState([]);

  const addReward = () => {
    setRewards([...rewards, { unit: "select", name: "" }]);
  };

  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...rewards];
    updatedRewards[index][field] = value;
    setRewards(updatedRewards);
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
    <div className="container rounded-lg bg-white">
      <div className="main-section">
        <div className="section-label">
          <h3>CREATE TASK</h3>
        </div>

        <div className="task-input-name">
          <label htmlFor="task-name">Task</label>
          <input type="text" id="task-name" placeholder="Task Name" required />
        </div>

        <div className="task-input-field">
          <div className="target-input">
            <label htmlFor="task-target">Target</label>
            <input type="number" id="task-target" placeholder="Like 1,2,3..." required />
          </div>
          <div className="unit-input">
            <label htmlFor="task-unit">Unit</label>
            <select id="task-unit" name="task-unit" required>
              <option value="select">Select</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="lb">Pound (lb)</option>
              <option value="hr">Hour (hr)</option>
              <option value="time">time</option>
              <option value="min">Minutes (min)</option>
            </select>
          </div>
          <button className="btn add-reward-btn rounded" onClick={addReward}>
            Add Reward
          </button>
        </div>
        <div id="reward-container">
          {rewards.map((reward, index) => (
            <div className="reward-input-field" key={index}>
              <select
                value={reward.unit}
                onChange={(e) => handleRewardChange(index, 'unit', e.target.value)}
                name="task-unit"
              >
                <option value="select">Select</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
              </select>
              <input
                type="text"
                placeholder="Reward Name"
                value={reward.name}
                onChange={(e) => handleRewardChange(index, 'name', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="additional-input">
          <textarea className="comment-input" placeholder="Enter your comment"></textarea>
          <input type="file" className="image-input" accept="image/*" />
        </div>

        <button className="btn rounded mt-0 mb-0 mr-auto ml-auto w-auto" >Create</button>
      </div>
    </div>
    </div>
  );
}

export default CreateTask;