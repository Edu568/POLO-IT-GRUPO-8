const db = require('../config/conexion.config.js');


//funcion para obtener todas las fotos de una publicacion
function getAllFotos(callback){
    const sql = `
        SELECT f.*, p.titulo AS publicacion
        FROM Foto f
        JOIN Publicacion p ON(f.id_publicacion = p.id)
        ORDER BY f.id_publicacion, f.id
    `;
    db.all(sql,[],callback);
}

//funcion para obetner una foto por id
function getFotoById(id,callback){
    const sql = `
        SELECT f.*, p.titulo AS publicacion
        FROM Foto f
        JOIN Publicacion p ON(f.id_publicacion = p.id)
        WHERE (f.id = ?)
    `;
    db.get(sql,[id],callback);
}

//funcion para crear una foto
function createFoto(data, callback){
    const {id_publicacion, url} = data;
    const sql = `
        INSERT INTO Foto(id_publicacion, url) VALUES (?,?)
    `;
    db.run(sql,[id_publicacion,url], function(error){
        if(error)return callback(error);
        callback(null,{id:this.lastID, ...data});
    });

}
//funcion para actualizar una foto
function updateFoto(id, data, callback) {
  const { id_publicacion, url } = data;
  const sql = `
    UPDATE Foto 
    SET id_publicacion = ?, url = ?
    WHERE id = ?
  `;
  db.run(sql, [id_publicacion, url, id], function (error) {
    if (error) return callback(error);
    callback(null, { changes: this.changes });
  });
}


//funcion para eliminar una foto
function deleteFoto(id,callback){
    const sql = `
        DELETE FROM Foto WHERE (id = ?)
    `;
    db.run(sql, [id], function(error){
        if(error)return callback(error);
        callback(null,{changes : this.changes});
    });
}

//se exportara a foto.service
//model --> service
module.exports = {
    getAllFotos,
    getFotoById,
    createFoto,
    updateFoto,
    deleteFoto
};