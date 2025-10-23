const db = require('./db.model');

function getAllBarrio(callback){
    const sql =`
        SELECT b.*, c.nombre AS ciudad
        FROM Barrio b
        JOIN Ciudad c ON (b.id_ciudad = c.id)
        ORDER BY b.nombre
    `;
    db.all(sql,[], callback);
}

function getBarrioById(id, callback){
    const sql = `
        SELECT b.*, c.nombre AS ciudad
        FROM Barrio b
        JOIN Ciudad c ON (b.id_ciudad = c.id)
        WHERE b.id = ?
    `;

    db.get(sql,[id], callback);
}

function createBarrio(data, callback){
    const {nombre, id_ciudad} = data;
    const sql = `
        INSERT INTO Barrio (nombre, id_ciudad) VALUES (?,?)
    `;
    db.run(sql,[nombre,id_ciudad], function(error){
        if(error)return callback(error);
        callback(null,{id: this.lastID, ...data});
    });
}

function updateBarrio(id, data, callback){
    const {nombre, id_ciudad} = data;
    const sql = `
        UPDATE Barrio SET (nombre = ?, id_ciudad = ?)
        WHERE (id = ?)
    `;
    db.run(sql,[nombre,id_ciudad, id], function(error){
        if(error) return callback(error);
        callback(null, {changes: this.changes});
    });
}

function deleteBarrio(id,callback){
    const sql = `
        DELETE FROM Barrio WHERE id = ?
    `;
    db.run(sql, [id], function(error){
        if(error) return callback(error);
        callback(null, {changes:this.changes});
    });
}

module.exports = {
    getAllBarrio,
    getBarrioById,
    createBarrio,
    updateBarrio,
    deleteBarrio
}