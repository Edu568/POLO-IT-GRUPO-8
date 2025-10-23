### Estructura general en el back
```text
Backend/
│
├── database/           -->Archivo SQlite de la DB
├── node_modules/
│
├── src/
│   ├── config/         -->Configuracion(DB)
│   ├── controllers/    -->Procesa las peticiones y delega logica
│   ├── middlewares/    -->Autenticaciones, validaciones de usuario usando JWT
│   ├── models/         -->Modelo de datos o esquemas(Las tablas de la DB)
│   ├── routes/         -->Definicion de rutas de la API
│   ├── service/        -->Logica de negocio, procesamiento y acceso a datos
│   └── utils/          -->Algunas funciones auxiliares y utilirarias
│
├── package-lock.json
├── package.json
├── Server.js           -->Punto de entrada(Configura express,escucha el puerto)
└── README.md
```

### Flujo de la peticion "publicaciones"
```text
        [Frontend]
            │
            ▼
        [ Route ]
src/routes/publicaciones.route.js
 - Define la URL (ej: GET /publicaciones)
 - Llama al controlador correspondiente
            │
            ▼
     [ Controller ]
src/controllers/publicaciones.controller.js
 - Recibe la request (req, res)
 - Llama al service (lógica de negocio)
 - Devuelve respuesta JSON al cliente
            │
            ▼
      [ Service ]
src/services/publicaciones.service.js
 - Intermediario entre controller y model
 - Manejara las promesas, errores y reglas de negocio extras
 - Llama al model para obtener datos
            │
            ▼
       [ Model ]
src/models/publicaciones.model.js
 - Contiene la consulta SQL
 - Ejecuta query en SQLite
 - Devuelve resultados al Service
            │
            ▼
      [ Base de Datos ]
database.sqlite
 - Tablas (Publicacion, Usuario, Categoria, Foto, Barrio, Ciudad)
 - Devuelve filas al model
```