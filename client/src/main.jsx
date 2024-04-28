import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import TaskPage from './components/Tasks/TaskPage'
import CreateTask from './components/Tasks/CreateTask'
import InvalidPage from './components/InvalidPage'
import Profile from './components/Profile/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Dashboard />}/>
      <Route path='task' element={<TaskPage />}/>
      <Route path='create-task' element={<CreateTask />}/>
      <Route path='profile' element={<Profile />}/>
      <Route path='*' element={<InvalidPage />}/>
    </Route>

))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
