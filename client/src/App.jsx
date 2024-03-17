import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import './styles/index.css'

function App() {
  return (
    <>
      {/* <h1 className="select-none text-center bg-cyan-200 py-5 mb-1">DIGITAL PROGRESS CARD</h1> */}
      <div className='logo-holder grid place-items-center bg-cyan-200 h-16 mb-1'><a href="#"><img className='logo-img' src="/media/images/logo.png" alt="logo" /></a></div>
      <Dashboard />
      <Footer />
    </>
  )
}

export default App
