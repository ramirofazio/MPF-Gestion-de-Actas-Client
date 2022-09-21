const { Sequelize } = require("sequelize");

const db = new Sequelize("MPF_Word_App", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
