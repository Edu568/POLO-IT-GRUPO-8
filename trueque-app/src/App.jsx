import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { DetalleProducto } from './pages/detalleProducto';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <HomePage /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/detalle" element={<DetalleProducto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App