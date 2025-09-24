const express = require('express');
const app = express();
const PORT = 3000;

require('./src/models/models.db');

app.get('/', (req, res)=> {
    res.send('Backend funcionando');
});

app.listen(PORT, () => {
    console.log('Corriendo en http://localhost:',PORT);
});