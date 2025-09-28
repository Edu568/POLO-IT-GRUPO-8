const publicacionesModel = require('../models/publicaciones.model');


function getPublicaciones(req, res) {
  publicacionesModel.getAllPublicaciones((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}


function getPublicacion(req, res) {
  const { id } = req.params;
  publicacionesModel.getPublicacionById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json(row);
  });
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


function deletePublicacion(req, res) {
  const { id } = req.params;
  publicacionesModel.deletePublicacion(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json({ message: "Publicación eliminada" });
  });
}



module.exports = {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
};
