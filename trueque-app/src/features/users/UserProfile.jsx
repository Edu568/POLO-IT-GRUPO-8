export async function registerUser(data) {
  const res = await fetch("http://localhost:3000/api/usuario/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
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
    const err = await res.text();
    throw new Error(err || res.statusText);
  }
  return res.json(); 
}

export async function getUsers() {
  const res = await fetch("http://localhost:3000/api/usuario/");
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}
