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

db.serialize(() => {
    // Tabla - Ciudad
    db.run(`
        CREATE TABLE IF NOT EXISTS Ciudad (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(50) NOT NULL,
            provincia VARCHAR(70) NOT NULL
        )
    `);

    // Tabla - Barrio
    db.run(`
        CREATE TABLE IF NOT EXISTS Barrio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(50) NOT NULL,
            id_ciudad INTEGER NOT NULL,
            FOREIGN KEY (id_ciudad) REFERENCES Ciudad(id)
        )
    `);

    // Tabla - Usuario
    db.run(`
        CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(30) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            id_barrio INTEGER NOT NULL,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_barrio) REFERENCES Barrio(id)
        )
    `);

    // Tabla - Categoria
    db.run(`
        CREATE TABLE IF NOT EXISTS Categoria (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(50) UNIQUE NOT NULL
        )
    `);

    // Tabla - Publicacion
    db.run(`
        CREATE TABLE IF NOT EXISTS Publicacion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo VARCHAR(50) NOT NULL,
            descripcion TEXT,
            id_categoria INTEGER NOT NULL,
            estado TEXT CHECK(estado IN ('Pendiente','Activa','Finalizada','Cancelada')) DEFAULT 'Pendiente',
            disponible BOOLEAN DEFAULT 1,
            id_dueno INTEGER NOT NULL,
            fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_categoria) REFERENCES Categoria(id),
            FOREIGN KEY (id_dueno) REFERENCES Usuario(id)
        )
    `);

    // Tabla - Foto
    db.run(`
        CREATE TABLE IF NOT EXISTS Foto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_publicacion INTEGER NOT NULL,
            url TEXT NOT NULL,
            FOREIGN KEY (id_publicacion) REFERENCES Publicacion(id)
        )
    `);
});

module.exports = db;

