const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "EstadoBolsa",
    {
      nro_precinto_blanco: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "En Proceso",
      },
    },
    { timestamps: false }
  );
};
