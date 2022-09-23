const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Estado",
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
