const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Almacenamiento = sequelize.define(
  "Almacenamiento",
  {
    marca: {
      type: DataTypes.STRING,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    capacidad: {
      type: DataTypes.STRING,
    },
    tipo_extraccion: {
      type: DataTypes.ENUM("fisica", "logica", "otro"),
    },
    tipo_almacenamiento: {
      type: DataTypes.ENUM("ssd", "hdd", "pendrive", "otro"),
    },
    nro_serie: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Almacenamiento;
