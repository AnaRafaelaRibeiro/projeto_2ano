const Sequelize = require("sequelize");
const db = require("./db");

const Empresa = db.define("empresa", {
  idEmpresa: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_empresa: {
    type: Sequelize.STRING(100),
    unique: true,
  },
});

module.exports = Empresa;
