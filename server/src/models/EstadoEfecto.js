const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "EstadoEfecto",
    {
      estado: {
        type: DataTypes.STRING,
        defaultValue: "En Proceso",
      },
    },
    { timestamps: false }
  );
};
