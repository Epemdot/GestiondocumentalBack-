const express = require('express');
const router = express.Router();
const abogadoController = require('../controllers/abogado.controller');

// Rutas para empleados
router.get('/', abogadoController.getAll);
router.get('/:id', abogadoController.getByid);
router.post('/', abogadoController.create);
router.put('/:id', abogadoController.update);
router.delete('/:id', abogadoController.delete);

module.exports = router;