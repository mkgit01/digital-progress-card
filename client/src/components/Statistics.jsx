import React from 'react'

const Statistics = () => {
  return (
    <div className='place-holder-stat sm:col-span-2 sm:w-4/5 w-11/12 grid place-items-center'>
      <div className='select-none grid place-items-center text-center'>
      <a href="#"><img width="100" height="100" src="https://img.icons8.com/ios-filled/100/00FFFF/add--v1.png" alt="add--v1"/></a>
        Enter tasks to access
        </div>
        <select className='filter hover:bg-cyan-200' name="filter" id="sort">
          <option value="weekly" selected>Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
    </div>
  )
}

export default Statistics