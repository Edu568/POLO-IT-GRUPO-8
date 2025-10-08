const express = require('express');
const cors = require('Cors')
const app = express();
const PORT = 3000;
const publicacionesRouter = require('./routes/publicacionesRouter');
const transaccionRouter = require('./routes/transaccion.route');

require('./models/db.model');

app.use(cors());
app.use(express.json());
app.use("/api/publicaciones", publicacionesRouter);
app.use('/api/transacciones', transaccionRouter);

// // Middleware 404 (después de routes)
// app.use('/*', (req, res) => {
//   res.status(404).json({ error: 'Endpoint no encontrado' });
// });

// // Middleware errores (último)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ error: { message: err.message } });
// });

app.listen(PORT, () => {
  console.log('Corriendo en http://localhost:' + PORT);
});
