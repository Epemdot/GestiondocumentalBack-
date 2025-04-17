const express = require('express');
const router = express.Router();
const asistenteController = require('../controllers/asistente.controller');

// Rutas para asistentes
router.get('/', asistenteController.getAll);
router.get('/:id', asistenteController.getByid);
router.post('/', asistenteController.create);
router.put('/:id', asistenteController.update);
router.delete('/:id', asistenteController.delete);

module.exports = router;