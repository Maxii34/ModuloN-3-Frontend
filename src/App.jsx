import './index.css'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import AdminHabitaciones from './components/pages/AdminHabitaciones'


function App() {

  return (
    <>
      <Navbar />
      <div>
        <AdminHabitaciones/>
      </div>
      <Footer />
      
    </>
  )
}

export default App
