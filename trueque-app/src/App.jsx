import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { DetalleProducto } from './pages/detalleProducto';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/detalle' element={<DetalleProducto/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
