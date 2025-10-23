const db = require('../config/conexion.config');

//funcion para crear un intercambio
function createTransaccion({id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante}, callback){
  const sql = `
    INSERT INTO Transaccion (id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante, estado) 
    VALUES (?, ?, ?, 'Pendiente')
  `;
  db.run(sql, [id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante], function(error){
    if(error) return callback(error);
    callback(null, {id: this.lastID});
  });
}

//Funcion para obtener todas los intercambios pendientes
function getTransaccionesPendientesByPublicacion(id_publicacion, callback){
    const sql = `
        SELECT id FROM Transaccion
        WHERE ( id_publicacion_ofrecida = ? OR id_publicacion_deseada = ? ) 
        AND estado = 'Pendiente'
    `;
    db.all(sql,[id_publicacion,id_publicacion],callback);
}

//funcion para Listar intercambios
function getTransaccion(callback){
    const sql = `
        SELECT t.id, t.estado, t.fecha_transaccion,
                po.titulo AS publicacion_ofrecida,
                pd.titulo AS publicacion_deseada,
                u.nombre AS ofertante
        FROM Transaccion t
        JOIN Publicacion po ON t.id_publicacion_ofrecida = po.id
        JOIN Publicacion pd ON t.id_publicacion_deseada = pd.id
        JOIN Usuario u ON t.id_usuario_ofertante = u.id
        ORDER BY t.fecha_transaccion DESC
    `;
    db.all(sql,[], (error,rows) =>{
        if(error) return callback(error);
        callback(null, rows);
    });
}

//funcion para cambiar el estado del id
function setEstadoTransaccion(id,estado,callback){
    const sql =`UPDATE Transaccion SET estado = ? WHERE id = ?`;
    db.run(sql,[estado,id], function(error){
        if(error) return callback(error);
        callback(null,{update:this.changes});
    });
}

//esta funcion verifica si hay una transaccion pendiente entre dos publicacion
function checkeoTransaccionDuplicado(id_publicacion_ofrecida,id_publicacion_deseada,callback){
    const sql = `
        SELECT id FROM Transaccion
        WHERE id_publicacion_ofrecida = ?
        AND id_publicacion_deseada = ?
        AND estado = 'Pendiente'
    `;
    db.get(sql, [id_publicacion_ofrecida,id_publicacion_deseada], (error,row) =>{
        if(error) return callback(error);
        callback(null, !!row);
    });
}

module.exports = {createTransaccion, getTransaccion, setEstadoTransaccion, checkeoTransaccionDuplicado, getTransaccionesPendientesByPublicacion};