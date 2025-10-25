const db = require('../config/conexion.config');

function getAllPublicaciones(callback) {
  const sql = `
    SELECT 
      p.id,
      p.titulo,
      p.descripcion,
      p.estado,
      p.disponible,
      p.fecha_publicacion,
      u.nombre AS usuario,
      c.nombre AS categoria
    FROM Publicacion p
    JOIN Usuario u ON p.id_dueno = u.id
    JOIN Categoria c ON p.id_categoria = c.id
    ORDER BY p.fecha_publicacion DESC
  `;
  db.all(sql, [], callback);
}

function getAllFotosPublicacionById(id, callback){
  const sql =`SELECT url FROM Foto WHERE id_publicacion = ? ORDER BY id`;
  db.all(sql,[id], callback);
}


function getPublicacionById(id, callback) {
  const sql = `
    SELECT 
      p.id,
      p.titulo,
      p.descripcion,
      p.estado,
      p.disponible,
      p.fecha_publicacion,
      u.nombre AS usuario,
      c.nombre AS categoria
    FROM Publicacion p
    JOIN Usuario u ON p.id_dueno = u.id
    JOIN Categoria c ON p.id_categoria = c.id
    WHERE p.id = ?
  `;
  db.get(sql, [id], callback);
}

function getAllPublicacionesByUsuario(id, callback){
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.descripcion,
      p.estado,
      p.disponible,
      p.fecha_publicacion,
      u.nombre AS usuario,
      c.nombre AS categoria
    FROM Publicacion p
    JOIN Categoria c ON(p.id_categoria = c.id)
    JOIN Usuario u ON(p.id_dueno = u.id)
    WHERE (u.id = ?)
  `;
  db.all(sql,[id],callback);
}


function createPublicacion(data, callback) {
  const { titulo, descripcion, id_categoria, id_dueno } = data;
  const sql = `
    INSERT INTO Publicacion (titulo, descripcion, id_categoria, id_dueno)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [titulo, descripcion, id_categoria, id_dueno], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...data });
  });
}


function updatePublicacion(id, data, callback) {
  const { titulo, descripcion, estado, disponible } = data;
  const sql = `
    UPDATE Publicacion 
    SET titulo = ?, descripcion = ?, estado = ?, disponible = ?
    WHERE id = ?
  `;
  db.run(sql, [titulo, descripcion, estado, disponible, id], function (err) {
    callback(err, { changes: this.changes });
  });
}


function deletePublicacion(id, callback) {
  const sql = `DELETE FROM Publicacion WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err, { changes: this.changes });
  });
}


//Este module se exportara "Service" para ser consumido
module.exports = {
  getAllPublicaciones,
  getPublicacionById,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getAllFotosPublicacionById,
  getAllPublicacionesByUsuario
};