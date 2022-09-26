const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bolsa",
    {
      nro_precinto: {
        type: DataTypes.BIGINT,
      },
      color_precinto: {
        type: DataTypes.ENUM("rojo", "verde"),
      },
      notas: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
