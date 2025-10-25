const publicacionesModel = require('../models/publicaciones.model');
const { listarPublicaciones, obtenerPublicacionById, listarPublicacionesPorUsuario } = require('../service/publicaciones.service');
const { eliminarPublicacion } = require('../service/publicaciones.service');
const fotoModel = require('../models/foto.model');


async function deletePublicacion(req, res) {
  try {
    const { id } = req.params;
    const result = await eliminarPublicacion(id);
    if (result.changes === 0) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json({ message: "Publicación eliminada", transaccionesCanceladas: result.transaccionesCanceladas || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPublicaciones(req, res) {
  try {
    const publicaciones = await listarPublicaciones();
    res.json(publicaciones); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getPublicacion(req, res) { 
  try {
    const { id } = req.params;
    const publicacion = await obtenerPublicacionById(id);
    if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json(publicacion);  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPublicacionByUsuario(req, res){
  try {
    const {id} = req.params;
    const publicaciones = await listarPublicacionesPorUsuario(id);
    if(!publicaciones) return res.status(404).json({error:'Usuario no encontrado'});
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function createPublicacion(req, res) {
  try {
    // Datos del cuerpo
    const { titulo, descripcion, id_categoria, id_dueno } = req.body;

    if (!titulo || !descripcion || !id_categoria || !id_dueno) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Crear la publicación primero
    await new Promise((resolve, reject) => {
      publicacionesModel.createPublicacion(
        { titulo, descripcion, id_categoria, id_dueno },
        (err, pub) => {
          if (err) return reject(err);
          resolve(pub);
        }
      );
    }).then(async (pub) => {
      const publicacionId = pub.id;

      // Procesar imágenes si hay archivos
      if (req.files && req.files.length > 0) {
        const fotosGuardadas = [];

        for (const file of req.files) {
          const url = `/uploads/${file.filename}`;
          await new Promise((resolve, reject) => {
            fotoModel.createFoto({ id_publicacion: publicacionId, url }, (err, result) => {
              if (err) return reject(err);
              fotosGuardadas.push(result);
              resolve();
            });
          });
        }

        pub.fotos = fotosGuardadas.map(f => f.url);
      }

      res.status(201).json({
        message: "Publicación creada correctamente",
        publicacion: pub
      });
    });
    } catch (error) {
    console.error("Error al crear la publicación:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
}

function updatePublicacion(req, res) {
  const { id } = req.params;
  publicacionesModel.updatePublicacion(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json({ message: "Publicación actualizada" });
  });
}





module.exports = {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionByUsuario
};
