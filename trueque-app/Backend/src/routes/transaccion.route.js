const {proponer, listar, actualizarEstado} = require('../controllers/transaccion.controller');

const express = require('express');

const router = express.Router();

router.post('/',proponer);
router.get('/',listar);
router.patch('/:id',actualizarEstado);

module.exports = router;