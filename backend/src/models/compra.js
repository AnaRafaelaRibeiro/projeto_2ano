const Sequelize = require("sequelize");
const db = require("./db");
const Comprador = require("./comprador");

const Compra = db.define("compra", {
  idCompra: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  quantidade: {
    type: Sequelize.INTEGER,
  },
  preco_compra: {
    type: Sequelize.DOUBLE,
  },
  email: {
    type: Sequelize.STRING,
  },
  software: {
    type: Sequelize.STRING,
  },
  idCompradorCompra: {
    type: Sequelize.INTEGER,
    references: {
      model: Comprador,
      key: "idComprador",
    },
  },
});

Compra.belongsTo(Comprador, {foreignKey: "idCompradorCompra"});

module.exports = Compra;
