const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Estado = sequelize.define(
  "Estado",
  {
    nro_precinto_blanco: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "En Proceso",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Estado;
