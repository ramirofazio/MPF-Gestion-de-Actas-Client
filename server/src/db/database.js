const { Sequelize } = require("sequelize");

module.exports = new Sequelize("MPF_Word_App", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
