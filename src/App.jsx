import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import DetalleHabitacion from './components/pages/detalleHabitacion'

function App() {

  return (
    <>
      <Navbar />
      //<Main />
      <div>
        <DetalleHabitacion/>
      </div>
      <Footer />
      
    </>
  )
}

export default App
