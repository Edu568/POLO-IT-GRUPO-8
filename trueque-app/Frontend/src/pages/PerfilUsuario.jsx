import { Navbarra } from "../components/Navbarra";
import { Footer } from "../components/Footer";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActualizarUsuario } from "../components/ActualizarUsuario";
import { MisPublicaciones } from "../features/products/MisPublicaciones";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuarioLocal) {
      navigate("/login");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/usuario/${usuarioLocal.id}`);
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsuario();
  }, [navigate, usuarioLocal]);

 
  // Los formularios y actualizaciones se manejan desde el componente <ActualizarUsuario />

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (!usuario) return <div className="text-center mt-5">Cargando usuario...</div>;

  return (
    <>
      <Navbarra />
      <Container className="my-5">
        <section className="mb-5">
          <h2 className="text-center mb-4 fw-bold border-bottom pb-2">
            👤 Información del Perfil
          </h2>
          <ActualizarUsuario
            usuario={usuario}
            onUsuarioActualizado={setUsuario}
            onLogout={handleLogout}
          />
        </section>

        <section className="mt-5">
          <h2 className="text-center mb-4 fw-bold border-bottom pb-2">
            📦 Mis Publicaciones
          </h2>
          <MisPublicaciones idUsuario={usuario.id} />
        </section>
      </Container>
      <Footer />
    </>
  );
};
