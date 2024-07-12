var sequelize = require("../models/db");
const Value = require("../models/gestor");
const controllers = {};
sequelize.sync();

controllers.getAll = async (req, res) => {
  try {
    const value = await Value.findAll();
    res.json(value);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar");
  }
};

controllers.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const value = await Value.findByPk(id);
    if (!value) {
      return res.status(404).send("Não encontrado");
    }
    res.json(value);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar");
  }
};

controllers.create = async (req, res) => {
  try {
    const newValue = await Value.create({
      pNome: req.body.pNome,
      uNome: req.body.uNome,
      email: req.body.email,
      produtos: req.body.produtos,
    });
    res.status(201).json(newValue);
  } catch (error) {
    console.error(error);
    res.status(400).send("Erro ao criar");
  }
};

controllers.update = async (req, res) => {
  const { id } = req.params;
  try {
    const value = await Value.findByPk(id);
    if (!value) {
      return res.status(404).send("Não encontrado");
    }
    await Value.update({
      pNome: req.body.pNome,
      uNome: req.body.uNome,
      email: req.body.email,
      produtos: req.body.produtos,
    }, {
      where: { idGestor: req.body.id }, // Specify the product to update based on ID
    });
    res.json(value);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar");
  }
};

controllers.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const value = await Value.findByPk(id);
    if (!value) {
      return res.status(404).send("Não encontrado");
    }
    await value.destroy();
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao apagar");
  }
};


module.exports = controllers;
