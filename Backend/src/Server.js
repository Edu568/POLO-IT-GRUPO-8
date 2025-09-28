const express = require('express');
const app = express();
const PORT = 3000;
const publicacionesRouter = require('./routes/publicacionesRouter');

require('./models/db.model');

app.use(express.json());
app.use("/api/publicaciones", publicacionesRouter);

app.listen(PORT, () => {
    console.log('Corriendo en http://localhost:'+ PORT);
});