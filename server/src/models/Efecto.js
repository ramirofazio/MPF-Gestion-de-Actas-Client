const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Efecto",
    {
      tipo: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      tipo_extraccion: {
        type: DataTypes.ENUM("fisica", "logica", "otra"),
      },
      nro_serie: {
        type: DataTypes.BIGINT,
      },
      tipo_desbloqueo: {
        type: DataTypes.ENUM("ninguno", "pin", "patron", "contraseña", "huella", "facial", "otro"),
      },
      IMEI: {
        type: DataTypes.BIGINT,
      },
      modelo: {
        type: DataTypes.STRING,
      },
      marca: {
        type: DataTypes.STRING,
      },
      notas: {
        type: DataTypes.STRING,
      },
      sofware: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.ENUM("en proceso", "completo", "deprecado"),
        defaultValue: "en proceso",
      },
    },
    { timestamps: false }
  );
};
