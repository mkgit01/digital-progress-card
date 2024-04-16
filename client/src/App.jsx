import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import CreateTask from './components/CreateTask'
import TaskPage from './components/TaskPage'

import './styles/index.css'
import Header from './components/Header'

function App() {
  return (
    <>
    <div className='full-page'>
      <Header />
      {/* <Dashboard /> */}
      <TaskPage />
     
      {/* <CreateTask /> */}
    </div>
    <Footer />
    </>
  )
}

export default App
