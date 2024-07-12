var sequelize = require("../models/db");
const Compra = require("../models/compra");
const controllers = {};
sequelize.sync();

controllers.getAll = async (req, res) => {
  try {
    const compra = await Compra.findAll();
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar compra");
  }
};

controllers.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).send("Compra não encontrada");
    }
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar compra");
  }
};

controllers.create = async (req, res) => {
  try {
    const newCompra = await Compra.create({
      data: req.body.data,
      email: req.body.email,
      software: req.body.software,
      preco_compra: req.body.preco_compra,
      quantidade: req.body.quantidade,
    });
    res.status(201).json(newCompra);
  } catch (error) {
    console.error(error);
    res.status(400).send("Erro ao criar compra");
  }
};

controllers.update = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).send("Compra não encontrada");
    }
    await Compra.update({
      data: req.body.data,
      email: req.body.email,
      software: req.body.software,
      preco_compra: req.body.preco_compra,
      quantidade: req.body.quantidade,
    }, {
      where: { idCompra: req.body.id }, // Specify the product to update based on ID
    });
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar compra");
  }
};

controllers.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).send("Compra não encontrada");
    }
    await compra.destroy();
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao apagar compra");
  }
};


module.exports = controllers;
