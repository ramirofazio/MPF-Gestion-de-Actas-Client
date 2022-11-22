const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sim",
    {
      nro_serie: {
        type: DataTypes.BIGINT,
      },
      nro_linea: {
        type: DataTypes.BIGINT,
      },
      tipo_extraccion: {
        type: DataTypes.ENUM("fisica", "logica", "otro"),
      },
      empresa: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "last_update",
    }
  );
};
