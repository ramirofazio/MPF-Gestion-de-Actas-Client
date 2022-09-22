const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Estado = db.define(
  "Estado",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
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
