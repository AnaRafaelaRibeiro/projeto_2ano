const Sequelize = require("sequelize");
const db = require("./db");

const TipoGestor = db.define("tipogestor", {
  departamentoTipoGestor: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

module.exports = TipoGestor;
