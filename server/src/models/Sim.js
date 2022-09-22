const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Sim = sequelize.define(
  "Sim",
  {
    nro_serie: {
      type: DataTypes.INTEGER,
    },
    nro_linea: {
      type: DataTypes.INTEGER,
    },
    tipo_extraccion: {
      type: DataTypes.ENUM("fisica", "logica", "otro"),
    },
    empresa: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Sim;
