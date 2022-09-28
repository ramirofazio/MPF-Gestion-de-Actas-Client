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
      estado: {
        type: DataTypes.STRING,
        defaultValue: "En Proceso",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "last_update",
    }
  );
};
