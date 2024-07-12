const Sequelize = require("sequelize");
const db = require("./db");
const Compra = require("./compra");

const Orcamento = db.define("orcamento", {
  idOrcamento: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade: {
    type: Sequelize.INTEGER,
  },
  precoTotalOrcamento: {
    type: Sequelize.DOUBLE,
  },
  descricaoOrcamento: {
    type: Sequelize.STRING,
  },
  cliente: {
    type: Sequelize.STRING,
  },
  numTel: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.DATE,
  },
  email: {
    type: Sequelize.STRING,
  },
  nota:{
    type: Sequelize.STRING,
  },
  idCompraOrcamento: {
    type: Sequelize.INTEGER,
    references: {
      model: Compra,
      key: "idCompra",
    },
  },
});

Orcamento.belongsTo(Compra, {foreignKey: "idCompraOrcamento"});

module.exports = Orcamento;
