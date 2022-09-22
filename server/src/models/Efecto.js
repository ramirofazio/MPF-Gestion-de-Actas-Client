const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Efecto = db.define(
  "Efecto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nro_precinto: {
      type: DataTypes.INTEGER,
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
    nro_precinto: {
      type: DataTypes.INTEGER,
    },
    nro_serie: {
      type: DataTypes.INTEGER,
    },
    tipo_desbloqueo: {
      type: DataTypes.ENUM("ninguno", "pin", "patron", "contraseña", "huella", "facial", "otro"),
    },
    notas: {
      type: DataTypes.STRING,
    },
    IMEI: {
      type: DataTypes.INTEGER,
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
