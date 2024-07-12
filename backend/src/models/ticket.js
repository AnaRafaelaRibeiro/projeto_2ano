const Sequelize = require("sequelize");
const db = require("./db");
const Gestor = require("./gestor");
const Produto = require("./produto");

const Ticket = db.define("ticket", {
  idTicket: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usernameTicket: {
    type: Sequelize.STRING(30),
  },
  emailTicket: {
    type: Sequelize.STRING,
  },
  dataTicket: {
    type: Sequelize.DATE,
  },
  prioridadeTicket: {
    type: Sequelize.STRING,
  },
  statusTicket: {
    type: Sequelize.STRING,
  },
  descricaoTicket: {
    type: Sequelize.STRING,
  },
  idProdutoTicket: {
    type: Sequelize.INTEGER,
    // referência a outro modelo
    references: {
      model: Produto,
      key: "idProduto",
    },
  },
  idGestorTicket: {
    type: Sequelize.INTEGER,
    // referência a outro modelo
    references: {
      model: Gestor,
      key: "idGestor",
    },
  },
});

Ticket.belongsTo(Produto, {foreignKey: "idProdutoTicket"});
Ticket.belongsTo(Gestor, {foreignKey: "idGestorTicket"});

module.exports = Ticket;
