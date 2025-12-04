import './index.css'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import ReservaHabitacion from './components/pages/ReservaHabitacion'

function App() {

  return (
    <>
      <Navbar />
      <div>
        <ReservaHabitacion></ReservaHabitacion>
      </div>
      <Footer />
      
    </>
  )
}

export default App
