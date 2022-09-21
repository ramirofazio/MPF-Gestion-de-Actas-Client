const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Acta = db.define("Acta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Acta;
