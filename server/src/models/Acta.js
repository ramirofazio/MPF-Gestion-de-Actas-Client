const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const Efecto = require("./Efecto");

const Acta = sequelize.define(
  "Acta",
  {
    nro_mpf: {
      type: DataTypes.INTEGER,
    },
    nro_cij: {
      type: DataTypes.INTEGER,
    },
    nro_dil: {
      type: DataTypes.INTEGER,
    },
    nro_coop: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Acta.hasMany(Efecto);
Efecto.belongsTo(Acta);

module.exports = Acta;
