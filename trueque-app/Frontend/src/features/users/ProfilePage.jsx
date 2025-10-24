import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../API/userApi";
import { ProfileForm } from "./ProfileForm";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (usuarioLocal) {
      getUserById(usuarioLocal.id)
        .then(setUser)
        .catch(() => setMessage("Error al cargar usuario"));
    }
  }, []);

  const handleSave = async (data) => {
    try {
      await updateUser(usuarioLocal.id, data);
      setMessage("Perfil actualizado correctamente");
    } catch (err) {
      setMessage(err.message || "Error al actualizar");
    }
  };

  if (!user) return <div className="text-center mt-5">Cargando perfil...</div>;

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Editar perfil</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <ProfileForm user={user} onSave={handleSave} />
    </div>
  );
};
