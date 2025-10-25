export async function getBarrios(){
  const res = await fetch('http://localhost:3000/api/barrio/');
  if(!res.ok) throw new Error('Error al obtener barrios');
  return res.json();
}

export async function getCategorias(){
  const res = await fetch('http://localhost:3000/api/categoria/');
  if(!res.ok) throw new Error('Error al obtener categorias');
  return res.json();

  //paa categorias
}

export async function registerUser(data) {
  const res = await fetch("http://localhost:3000/api/usuario/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err || res.statusText);
  }
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch("http://localhost:3000/api/usuario/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err || res.statusText);
  }
  return res.json(); 
}

export async function getUsers() {
  const res = await fetch("http://localhost:3000/api/usuario/");
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}
export async function getUserById(id) {
  const res = await fetch(`http://localhost:3000/api/usuario/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`http://localhost:3000/api/usuario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al actualizar usuario");
  }
  return res.json();
}
