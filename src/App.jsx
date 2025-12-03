import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import DetalleHabitacion from './components/pages/detalleHabitacion'

function App() {

  return (
    <>
      <Navbar />
      <Main />
      <div>
        <DetalleHabitacion/>
      </div>
    </>
  )
}

export default App
