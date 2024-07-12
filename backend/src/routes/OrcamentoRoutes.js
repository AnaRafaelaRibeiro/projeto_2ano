const express = require("express");
const router = express.Router();
const OrcamentoController = require("../controllers/OrcamentoController");

router.get('/lista', OrcamentoController.getAll);
router.get('/get/:id', OrcamentoController.getById);
router.post('/criar', OrcamentoController.create);
router.put('/atualizar/:id', OrcamentoController.update);
router.delete('/apagar/:id', OrcamentoController.delete);

module.exports = router;
