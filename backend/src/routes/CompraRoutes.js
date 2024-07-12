const express = require("express");
const router = express.Router();
const CompraController = require("../controllers/CompraController");

router.get('/lista-compra', CompraController.getAll);
router.get('/get/:id', CompraController.getById);
router.post('/criar-compra', CompraController.create);
router.put('/atualizar-compra/:id', CompraController.update);
router.delete('/apagar-compra/:id', CompraController.delete);

module.exports = router;
