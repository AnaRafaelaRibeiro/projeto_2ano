const Sequelize = require("sequelize");
const db = require("./db");

const TipoPackProduto = db.define("tipopackproduto", {
  idTipoPackProduto: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoriaTipoPackProduto: {
    type: Sequelize.STRING,
  },
});

module.exports = TipoPackProduto;
