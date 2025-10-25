import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { DetalleProducto } from './pages/detalleProducto';
import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { PerfilUsuario } from './pages/PerfilUsuario';
import CargaProductoPage from './pages/CargaProductoPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchItems, setSearchItems] = useState("");


  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <HomePage searchItems={searchItems}  /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cargar-producto" element={<CargaProductoPage />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/confirmation/:id" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
        <Route path="/perfil" element={<PerfilUsuario />} />


        {/* <Route
          path="/perfil"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App