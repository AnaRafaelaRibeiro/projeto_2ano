const express = require("express");
const router = express.Router();
const Controller = require("../controllers/GestorController");

router.get('/lista', Controller.getAll);
router.get('/get/:id', Controller.getById);
router.post('/criar', Controller.create);
router.put('/atualizar/:id', Controller.update);
router.delete('/apagar/:id', Controller.delete);

module.exports = router;
