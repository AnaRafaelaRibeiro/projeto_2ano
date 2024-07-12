const Sequelize = require("sequelize");
const db = require("./db");
const Admin = require("./admin");

const Comprador = db.define("comprador", {
  idComprador: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usernameComprador: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  emailComprador: {
    type: Sequelize.STRING,
    unique: true,
  },
  contactoComprador: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  idAdminComprador: {
    type: Sequelize.INTEGER,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
});

Comprador.belongsTo(Admin, {foreignKey: "idAdminComprador"});

module.exports = Comprador;
