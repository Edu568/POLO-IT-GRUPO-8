const express = require('express');
const router = express.Router();
const {
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    loginUsuario
} = require('../controllers/usuario.controller');

router.get('/',getUsuario);
router.post('/login',loginUsuario);
router.get('/:id',getUsuarioById);
router.post('/',createUsuario);
router.put('/:id',updateUsuario);

module.exports = router;