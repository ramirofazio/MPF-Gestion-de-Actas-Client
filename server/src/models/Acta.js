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
      nro_causa: {
        type: DataTypes.INTEGER,
      },
      caratula: {
        type: DataTypes.STRING,
      },
      solicitante: {
        type: DataTypes.STRING,
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "en proceso",
      },
      observaciones: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
