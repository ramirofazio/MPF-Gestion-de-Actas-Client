const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("MPF_Word_App", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Acta, Almacenamiento, Efecto, Sim, Bolsa, Integrante, Template } = sequelize.models;

Template.hasMany(Acta, { foreignKey: "template_id" });
Acta.belongsTo(Template, { foreignKey: "template_id" });
Acta.hasMany(Bolsa, { foreignKey: "acta_id" });
Bolsa.belongsTo(Acta, { foreignKey: "acta_id" });
Acta.hasMany(Integrante, { foreignKey: "acta_id" });
Integrante.belongsTo(Acta, { foreignKey: "acta_id" });
Bolsa.hasMany(Efecto, { foreignKey: "bolsa_id" });
Efecto.belongsTo(Bolsa, { foreignKey: "bolsa_id" });
Efecto.hasMany(Almacenamiento, { foreignKey: "efecto_id" });
Almacenamiento.belongsTo(Efecto, { foreignKey: "efecto_id" });
Efecto.hasMany(Sim, { foreignKey: "efecto_id" });
Sim.belongsTo(Efecto, { foreignKey: "efecto_id" });

// Aca vendrian las relaciones
// Product.hasOne(Stock);
// Stock.belongsTo(Product);
// Client.hasMany(Sale);
// Sale.belongsTo(Client); // pasarle client id a la tabla SALE
// Sale.hasMany(Orderline);
// Orderline.belongsTo(Sale);
// Product.hasMany(Orderline);
// Orderline.belongsTo(Product);
// Sale.belongsToMany(Monthlycost, { through: Finance });
// Monthlycost.belongsToMany(Sale, { through: Finance });
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize, // para importart la conexión { conn } = require('./db.js');
};
