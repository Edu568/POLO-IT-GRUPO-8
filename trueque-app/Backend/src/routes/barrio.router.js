const express = require('express');
const router = express.Router();
const {
    getBarrios,
    getBarrioById,
    createBarrio,
    updateBarrio,
    deleteBarrio
} = require ('../controllers/barrio.controller.js');

router.get('/',getBarrios);
router.get('/:id',getBarrioById);
router.post('/',createBarrio);
router.put('/:id',updateBarrio);
router.delete('/:id',deleteBarrio);

module.exports = router;