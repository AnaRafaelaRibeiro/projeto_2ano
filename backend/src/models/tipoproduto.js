const Sequelize = require("sequelize");
const db = require("./db");

const TipoProduto = db.define(
  "tipoproduto",
  {
    tipoProduto: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  {
    // Disabling timestamps creation
    timestamps: false,
  }
);

module.exports = TipoProduto;
