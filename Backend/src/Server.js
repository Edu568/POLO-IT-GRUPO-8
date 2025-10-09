const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;
const publicacionesRouter = require('./routes/publicacionesRouter');
const transaccionRouter = require('./routes/transaccion.route');
const fotoRouter = require('./routes/foto.router');

require('./models/db.model');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use("/api/publicaciones", publicacionesRouter);
app.use('/api/transacciones', transaccionRouter);
app.use('/api/foto', fotoRouter);


app.listen(PORT, () => {
  console.log('Corriendo en http://localhost:' + PORT);
});
