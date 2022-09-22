const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Sim = db.define(
  "Sim",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
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
