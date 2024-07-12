const Sequelize = require("sequelize");
const db = require("./db");
const Gestor = require("./gestor");
const Comprador = require("./comprador");
const Admin = require("./admin");

const Login = db.define("login", {
  idLogin: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  idGestorLogin: {
    type: Sequelize.INTEGER,
    // referência a outro modelo
    references: {
      model: Gestor,
      key: "idGestor",
    },
  },
  idCompradorLogin: {
    type: Sequelize.INTEGER,
    // referência a outro modelo
    references: {
      model: Comprador,
      key: "idComprador",
    },
  },
  idAdminLogin: {
    type: Sequelize.INTEGER,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
});

Login.belongsTo(Gestor, {foreignKey: "idGestorLogin"});
Login.belongsTo(Comprador, {foreignKey: "idCompradorLogin"});
Login.belongsTo(Admin, {foreignKey: "idAdminLogin"});

module.exports = Login;
