const db = require('../config/conexion.config');

//funcion para crear un intercambio
function createTransaccion({id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante},callback){
    const sql = `
        INSERT INTO Transaccion(id_publicacion_ofrecida, id_publicacion_deseada, id_usuario_ofertante, estado) VALUES (?,?,?,'Pendiente') 
    `;
    db.run(sql,[id_publicacion_ofrecida,id_publicacion_deseada,id_usuario_ofertante], function(error){
        if(error) return callback(error);
        callback(null, {id: this.lastID});
    });
}

//funcion para Listar intercambios
function getTransaccion(callback){
    const sql = `
        SELECT * FROM Transaccion
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

module.exports = {createTransaccion, getTransaccion, setEstadoTransaccion};