const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
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
    { timestamps: false }
  );
};
