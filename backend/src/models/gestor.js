const Sequelize = require("sequelize");
const db = require("./db");
const TipoGestor = require("./tipogestor");
const Admin = require("./admin");

const Gestor = db.define("gestor", {
  idGestor: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pNome:{
    type: Sequelize.STRING,
  },
  uNome: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  produtos: {
    type: Sequelize.STRING,
  },
  departamento: {
    type: Sequelize.STRING,
    references: {
      model: TipoGestor,
      key: "departamentoTipoGestor",
    },
  },
  idAdminGestor:{
    type: Sequelize.INTEGER,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
});

Gestor.belongsTo(TipoGestor, {foreignKey: "departamento"});
Gestor.belongsTo(Admin, {foreignKey: "idAdminGestor"});

module.exports = Gestor;
