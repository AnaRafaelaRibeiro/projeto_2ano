const Sequelize = require("sequelize");
const db = require("./db");

const Admin = db.define("admin", {
  idAdmin: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username_admin: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  email_admin: {
    type: Sequelize.STRING,
    unique: true,
  },
  departamento_admin: {
    type: Sequelize.STRING,
  },
});

module.exports = Admin;
