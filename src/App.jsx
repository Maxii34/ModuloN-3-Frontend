import './index.css'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import DetalleHabitacion from './components/pages/detalleHabitacion'

function App() {

  return (
    <>
      <Navbar />
      <div>
        <DetalleHabitacion/>
      </div>
      <Footer />
      
    </>
  )
}

export default App
