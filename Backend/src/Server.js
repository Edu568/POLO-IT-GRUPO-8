const express = require('express');
const app = express();
const PORT = 3000;
const publicacionesRouter = require('./routes/publicacionesRouter');
const transaccionRouter = require('./routes/transaccion.route');

require('./models/db.model');

app.use(express.json());
app.use("/api/publicaciones", publicacionesRouter);
app.use('/api/transacciones', transaccionRouter);



app.listen(PORT, () => {
    console.log('Corriendo en http://localhost:'+PORT);
});