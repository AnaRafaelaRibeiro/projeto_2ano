var sequelize = require("../models/db");
const Produto = require("../models/produto");
const fs = require('fs');
const controllers = {};
sequelize.sync();

controllers.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar produtos");
  }
};

controllers.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar produtos");
  }
};

controllers.createProduto = async (req, res) => {
  //const { filename } = req.file;
  //const newPath = `/uploads/produtos/imgs/${filename}`;
  try {
    const newProduto = await Produto.create({
      quantidadeProduto: req.body.quantidadeProduto,
      nameProduto: req.body.nameProduto,
      precoProduto: req.body.precoProduto,
      descricaoProduto: req.body.descricaoProduto,
      versaoProduto: req.body.versaoProduto,
      licencaProduto: req.body.licencaProduto,
      statusProduto: req.body.statusProduto,
      //imagePath: newPath,
      //image: req.file == undefined ? 'default-image.jpg' : req.file.filename,
    });
    res.status(201).json(newProduto);
  } catch (error) {
    console.error(error);
    res.status(400).send("Erro ao criar produto");
  }
};

controllers.updateProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }
    await Produto.update({
      nameProduto: req.body.nameProduto,
      precoProduto: req.body.precoProduto,
      descricaoProduto: req.body.descricaoProduto,
      versaoProduto: req.body.versaoProduto,
    }, {
      where: { idProduto: req.body.id }, // Specify the product to update based on ID
    });
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar produto");
  }
};

controllers.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    // Get the image path from the product object
    const url = produto.imagePath;
    const imagePath = `C:/ProgramFiles/pi_2ano/client/public/${url}`;

    // Delete the image file (assuming 'fs' for file system access)
    const fs = require('fs');
    if (imagePath && imagePath !== 'default-image.jpg') {
      try {
        fs.unlinkSync(imagePath); // Delete the file if it exists (excluding default image)
      } catch (err) {
        console.error("Error deleting image:", err);
        // Handle potential errors during image deletion (optional)
      }
    }

    await produto.destroy();
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao apagar produto");
  }
};


module.exports = controllers;
