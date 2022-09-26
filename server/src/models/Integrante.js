const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Integrante",
    {
      nombre: {
        type: DataTypes.STRING,
      },
      cargo_o_profesion: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.INTEGER,
      },
      domicilio: {
        type: DataTypes.STRING,
      },
      matricula: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
