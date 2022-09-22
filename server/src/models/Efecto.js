const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Efecto = sequelize.define(
  "Efecto",
  {
    nro_precinto: {
      type: DataTypes.BIGINT,
    },
    color_precinto: {
      type: DataTypes.ENUM("rojo", "verde"),
    },
    tipo: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    tipo_extraccion: {
      type: DataTypes.ENUM("fisica", "logica", "otra"),
    },
    nro_serie: {
      type: DataTypes.BIGINT,
    },
    tipo_desbloqueo: {
      type: DataTypes.ENUM("ninguno", "pin", "patron", "contraseña", "huella", "facial", "otro"),
    },
    notas: {
      type: DataTypes.STRING,
    },
    IMEI: {
      type: DataTypes.BIGINT,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Efecto;
