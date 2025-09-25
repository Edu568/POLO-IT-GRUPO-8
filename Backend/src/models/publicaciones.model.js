const db = require('../config/conexion.config');

function getAllPublicaciones(callback) {
  const sql = `
    SELECT 
      p.titulo,
      p.descripcion,
      p.estado,
      p.disponible,
      p.fecha_publicacion,
      u.nombre AS usuario,
      c.nombre AS categoria,
      f.url AS foto
    FROM Publicacion p
    JOIN Usuario u ON p.id_dueno = u.id
    JOIN Categoria c ON p.id_categoria = c.id
    LEFT JOIN Foto f ON f.id_publicacion = p.id
    ORDER BY p.fecha_publicacion DESC
  `;
  db.all(sql, [], callback);
}
//Este module se exportara "Service" para ser consumido
module.exports = {getAllPublicaciones}