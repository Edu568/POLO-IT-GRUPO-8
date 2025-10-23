const { 
  createTransaccion, 
  getTransaccion, 
  setEstadoTransaccion, 
  checkeoTransaccionDuplicado } = require('../models/transaccion.model');

  const { getPublicacionById } = require('../models/publicaciones.model'); 

const estadosValidos = ['Pendiente', 'Aceptado', 'Rechazado', 'Cancelado'];


function getPublicacionByIdAsync(id) {
  return new Promise((resolve, reject) => {
    getPublicacionById(id, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function checkeoTransaccionDuplicadoAsync(id_publicacion_ofrecida, id_publicacion_deseada) {
  return new Promise((resolve, reject) => {
    checkeoTransaccionDuplicado(id_publicacion_ofrecida, id_publicacion_deseada, (err, existe) => {
      if (err) reject(err);
      else resolve(existe);
    });
  });
}

function createTransaccionAsync(data) {
  return new Promise((resolve, reject) => {
    createTransaccion(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function proponerTransaccion(data) {
  const { id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante } = data;

  //valido que los campos tengan datos
  if (!id_publicacion_deseada || !id_publicacion_ofrecida || !id_usuario_ofertante) {
    throw new Error('Faltan campos obligatorios');
  }
  //Validaciones de transaccion y publicacion
  const pub_ofrecida = await getPublicacionByIdAsync(id_publicacion_ofrecida);
  //valido que la publicacion ofrecida exista
  if (!pub_ofrecida) throw new Error('Publicacion ofrecida no existe');

  //verifico que la publicacion ofrecida este disponible
  if (!pub_ofrecida.disponible) throw new Error('Publicacion ofrecida no disponible');
  
  //verifico
  if (pub_ofrecida.id_dueno !== id_usuario_ofertante) throw new Error('Usuario no es dueño de la ofrecida');

  const pub_deseada = await getPublicacionByIdAsync(id_publicacion_deseada);
  //verfico que la publicacion deseada existe
  if (!pub_deseada) throw new Error('Publicacion deseada no existe');

  //verifico que la publicacion deseada este disponible
  if (!pub_deseada.disponible) throw new Error('Publicacion deseada no disponible');
  
  //verifico que el usuario no se intercambie a si mismo
  if (pub_deseada.id === pub_ofrecida.id) throw new Error('No puedes intercambiar contigo mismo');
  
  //verifico que el usuario quiera intercambiar con su propia publicacion
  if (pub_deseada.id_dueno === id_usuario_ofertante) throw new Error('No puedes intercambiar con tu propia publicación');

  //verifico que no haya duplicados entre dos transacciones, se evita la redundancia
  const existeDuplicado = await checkeoTransaccionDuplicadoAsync(id_publicacion_ofrecida, id_publicacion_deseada);
  if (existeDuplicado) throw new Error('Ya existe una transaccion pendiente entre estas publicaciones');

  const result = await createTransaccionAsync(data);
  return { id: result.id, ...data, estado: 'Pendiente' };
}

function listarTransacciones() {
  return new Promise((resolve, reject) => {
    getTransaccion((error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
}

function cambiarEstado(id, estado) {
  return new Promise((resolve, reject) => {
    if (!estadosValidos.includes(estado)) {
      return reject(new Error('Estado invalido'));
    }
    setEstadoTransaccion(id, estado, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

module.exports = { proponerTransaccion, listarTransacciones, cambiarEstado };
