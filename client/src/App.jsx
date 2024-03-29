import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import CreateTask from './components/CreateTask'

import './styles/index.css'

function App() {
  return (
    <>
      <div className='logo-holder grid place-items-center bg-cyan-200 h-16 mb-1'><a href="#"><img className='logo-img' src="/media/images/logo.png" alt="logo" /></a></div>
      <Dashboard />
      <Footer />
      {/* <CreateTask /> */}
    </>
  )
}

export default App
