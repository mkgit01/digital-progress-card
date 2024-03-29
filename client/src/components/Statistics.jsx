import React from 'react'

const Statistics = () => {
  return (
    <div className='place-holder-stat sm:col-span-2 sm:w-4/5 w-11/12 grid place-items-center'>
      <div className='select-none grid place-items-center text-center'>
      <a href="./CreateTask.jsx">
        <div className="add-tsk rounded-full grid place-items-center text-3xl">+</div>
        </a>
        Enter tasks to access
        </div>
        <select className='filter' name="filter" id="sort">
          <option value="weekly" selected>Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
    </div>
  )
}

export default Statistics