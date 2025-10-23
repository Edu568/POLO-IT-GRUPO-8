const publicacionesModel = require('../models/publicaciones.model');
const { listarPublicaciones, obtenerPublicacionById, listarPublicacionesPorUsuario } = require('../service/publicaciones.service');
const { eliminarPublicacion } = require('../service/publicaciones.service');


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

function createPublicacion(req, res) {
  publicacionesModel.createPublicacion(req.body, (err, pub) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(pub);
  });
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
