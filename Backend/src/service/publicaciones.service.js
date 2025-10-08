
const { getAllPublicaciones, getAllFotosPublicacionById, getPublicacionById, deletePublicacion: deletePublicacionModel } = require('../models/publicaciones.model');
const { getTransaccionesPendientesByPublicacion, setEstadoTransaccion } = require('../models/transaccion.model');



function eliminarPublicacion(id) {
  return new Promise((resolve, reject) => {
    getTransaccionesPendientesByPublicacion(id, (err, transacciones) => {
      if (err) return reject(err);

      if (transacciones.length > 0) {
        const promesasCancel = transacciones.map(t => 
          new Promise((res, rej) => {
            setEstadoTransaccion(t.id, 'Cancelado', (error, result) => {
              if (error) return rej(error);
              res(result);
            });
          })
        );

        Promise.all(promesasCancel)
          .then(() => {
            deletePublicacionModel(id, (error, result) => {  
              if (error) return reject(error);
              resolve({ ...result, transaccionesCanceladas: transacciones.length });
            });
          })
          .catch(reject);
      } else {
        deletePublicacionModel(id, (error, result) => { 
          if (error) return reject(error);
          resolve(result);
        });
      }
    });
  });
}




function listarPublicaciones() {
  return new Promise((resolve, reject) => {
    getAllPublicaciones((error, publicaciones) => {
      if (error) return reject(error);

      const promesasFotos = publicaciones.map(pub => 
        new Promise((res, rej) => {
          getAllFotosPublicacionById(pub.id, (err, fotos) => {
            if (err) return rej(err);
            res({ ...pub, fotos: fotos.map(f => f.url) || [] });
          });
        })
      );

      Promise.all(promesasFotos)
        .then(resultados => resolve(resultados))
        .catch(reject);
    });
  });
}

function obtenerPublicacionById(id) {
  return new Promise((resolve, reject) => {
    getPublicacionById(id, (error, publicacion) => {
      if (error) return reject(error);
      if (!publicacion) return resolve(null);

      getAllFotosPublicacionById(id, (err, fotos) => {
        if (err) return reject(err);
        resolve({ ...publicacion, fotos: fotos.map(f => f.url) || [] });
      });
    });
  });
}



module.exports = { listarPublicaciones, obtenerPublicacionById, eliminarPublicacion };
