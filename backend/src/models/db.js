var Sequelize = require("sequelize");
const sequelize = new Sequelize("findcoreproject", "postgres", "Minecraftnerf_1", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});

module.exports = sequelize;
