const db = require('../config/conexion.config');

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

    //Tabla - Transaccion
    db.run(`
        CREATE TABLE IF NOT EXISTS Transaccion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_publicacion_ofrecida INTEGER NOT NULL,
            id_publicacion_deseada INTEGER NOT NULL,
            id_usuario_ofertante INTEGER NOT NULL,
            estado TEXT CHECK(estado IN('Pendiente','Aceptado','Rechazado','Cancelado'))DEFAULT 'Pendiente',
            fecha_transaccion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_publicacion_ofrecida) REFERENCES Publicacion(id),
            FOREIGN KEY (id_publicacion_deseada) REFERENCES Publicacion(id),
            FOREIGN KEY (id_usuario_ofertante) REFERENCES Usuario(id)
        )
        `);

    

});

module.exports = db;

