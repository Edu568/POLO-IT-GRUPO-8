import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { DetalleProducto } from './pages/detalleProducto';
import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import { ProfilePage } from "./features/users/ProfilePage";
import { PerfilUsuario } from './pages/PerfilUsuario';

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
        <Route path="/detalle/:id" element={<DetalleProducto />} />
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