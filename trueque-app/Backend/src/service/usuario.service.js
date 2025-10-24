const {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    checkEmailExiste,
    checkEmailExisteExcluyendoId
} = require('../models/usuario.model');

//Valido el barrio
const {listarBarrioById} = require('./barrio.service');

function listarUsuario(){
    return new Promise((resolve, reject) =>{
        getAllUsuario((error, rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

function listarUsuarioById(id){
    return new Promise((resolve,reject) =>{
        getUsuarioById(id, (error, rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

// falta chequear de los campos nombre, apellido, email y password, si en una cadena string no vacio y si tiene menos de X caracteres aceptado
async function crearUsuario(data){
    const {nombre,apellido,email,password, id_barrio} = data;
    //Valido los campos
    if(!nombre || !apellido || !email || !password || !id_barrio){
        return Promise.reject(new Error('Campos requeridos'));
    }

    //Valido el barrio
    const barrio = await listarBarrioById(id_barrio);
    if(!barrio) return Promise.reject(new Error('Barrio no existe'));

    //Valido el email sea unico
    const emailExiste = await new Promise((resolve, reject) =>{
        checkEmailExiste(email, (error, result) =>{
            if(error) reject(new Error('Email ya registrado'));
            else resolve(result);
        })
    });

    if(emailExiste) return new Promise.reject(new Error('Email ya registrado'));

    return new Promise((resolve,reject) =>{
        createUsuario(data,(error, result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

//idem con las validaciones de crearUsaurio
async function actualizarUsuario(id, data) {
  // Verifico que el usuario exista
  const usuarioActual = await listarUsuarioById(id);
  if (!usuarioActual) return Promise.reject(new Error('Usuario no encontrado'));

  const { nombre, apellido, email, id_barrio } = data;

  // Preparo el nuevo objeto, pero solo con valores definidos
  const nuevosDatos = {};
  if (nombre !== undefined) nuevosDatos.nombre = nombre;
  if (apellido !== undefined) nuevosDatos.apellido = apellido;
  if (email !== undefined) nuevosDatos.email = email;
  if (id_barrio !== undefined) nuevosDatos.id_barrio = id_barrio;

  // Validar email duplicado si se actualiza
  if (email && email !== usuarioActual.email) {
    const emailUnico = await new Promise((resolve, reject) => {
      checkEmailExisteExcluyendoId(email, id, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    if (emailUnico) return Promise.reject(new Error('El email ya se encuentra registrado'));
  }

  // Si cambia el barrio, validar que exista
  if (id_barrio) {
    const barrio = await listarBarrioById(id_barrio);
    if (!barrio) return Promise.reject(new Error('Barrio no existe'));
  }

  // Actualizo en base de datos
  return new Promise((resolve, reject) => {
    updateUsuario(id, nuevosDatos, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

async function iniciarSesion(email,password){
    return new Promise((resolve, reject) =>{
        loginUsuario(email,password,(error, result) =>{
            if(error) reject(error);
            else resolve(result || null);
        });
    });
}
    //por el momento lo dejara para hacer luego 
    // async function eliminarUsuario()

module.exports = {
    listarUsuario,
    listarUsuarioById,
    crearUsuario,
    actualizarUsuario,
    iniciarSesion
}
