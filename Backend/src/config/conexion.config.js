const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database/database.sqlite');
const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.log('Hubo un error en la conexión a SQLite:', error.message);
    } else {
        console.log('Conectado a SQLite');
        db.run("PRAGMA foreign_keys = ON"); // Habilito las claves foráneas
    }
});

module.exports = db;