const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Template",
    {
      doc: {
        type: DataTypes.BLOB,
      },
    },
    {
      timestamps: false,
    }
  );
};
