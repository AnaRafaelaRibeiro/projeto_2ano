const Sequelize = require("sequelize");
const db = require("./db");
const TipoPackProduto = require("./tipopackproduto");
const Admin = require("./admin");

const PackProduto = db.define("packproduto", {
  idPackProduto: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomePackProduto: {
    type: Sequelize.STRING,
  },
  quantidadePackProduto: {
    type: Sequelize.INTEGER,
  },
  versoesPackProduto: {
    type: Sequelize.FLOAT,
  },
  precoPackProduto: {
    type: Sequelize.DOUBLE,
  },
  licencaPackProduto: {
    type: Sequelize.STRING(255),
  },
  statusPackProduto: {
    type: Sequelize.STRING,
  },
  idTipoPackProdutoProduto:{
    type: Sequelize.INTEGER,
    references: {
      model: TipoPackProduto,
      key: "idTipoPackProduto",
    },
  },
  idAdminPackProduto:{
    type: Sequelize.INTEGER,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
});

PackProduto.belongsTo(TipoPackProduto, {foreignKey: "idTipoPackProdutoProduto"});
PackProduto.belongsTo(Admin, {foreignKey: "idAdminPackProduto"});

module.exports = PackProduto;
