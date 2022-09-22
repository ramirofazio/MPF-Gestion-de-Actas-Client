const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Almacenamiento = db.define(
  "Almacenamiento",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
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
