const Sequelize = require("sequelize");
const db = require("./db");
const Gestor = require("./gestor");
const Admin = require("./admin");
const TipoProduto = require("./tipoproduto");

const Produto = db.define(
  "produto",
  {
    idProduto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameProduto:{
      type: Sequelize.STRING(30),
    },
    quantidadeProduto: {
      type: Sequelize.INTEGER,
    },
    precoProduto: {
      type: Sequelize.DOUBLE,
    },
    descricaoProduto: {
      type: Sequelize.STRING(100),
    },
    versaoProduto: {
      type: Sequelize.FLOAT,
    },
    licencaProduto: {
      type: Sequelize.STRING(255),
    },
    statusProduto: {
      type: Sequelize.STRING,
    },
    imagePath: {
      type: Sequelize.STRING,
    },
    idGestorProduto:{
      type: Sequelize.INTEGER,
      references: {
        model: Gestor,
        key: "idGestor",
      },
    },
    idAdminProduto:{
      type: Sequelize.INTEGER,
      references: {
        model: Admin,
        key: "idAdmin",
      }
    },
    tipo:{
      type: Sequelize.STRING,
      references:{
        model: TipoProduto,
        key: "tipoProduto",
      },
    },
  },
  {
    // Disabling timestamps creation
    timestamps: false,
  }
);

Produto.belongsTo(Gestor, {foreignKey: "idGestorProduto"});
Produto.belongsTo(Admin, {foreignKey: "idAdminProduto"});
Produto.belongsTo(TipoProduto, {foreignKey: "tipo"});

module.exports = Produto;
