import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Marginals/Footer'
import Header from './components/Marginals/Header'
import Profile from './components/Profile/Profile'
import CreateTask from './components/Tasks/CreateTask'
import './styles/index.css'

function App() {
  return (
    <>
      <Header />
      {/* <Dashboard /> */}
      {/* <CreateTask/> */}
      <Profile/>
      <Footer />
    </>
  )
}

export default App
