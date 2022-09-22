const express = require("express");
const cors = require("cors");
const db = require("./src/db/database");
const actas = require("./src/routes/actas");

const app = express();
const port = 3030;

(async () => {
  try {
    await db.authenticate(); //Conecta la DB
    await db.sync({ force: true }); //Sincroniza las tablas
    console.log("--->  DB conectada");
  } catch (error) {
    console.log(error);
  }
})();

//middlewares
app.use(express.json()); //Recibir info
app.use(cors()); //habilita otras apps para realizar solicitudes

//Routes
app.use("/actas", actas);

app.listen(port, () => {
  console.log("---> Server ejecutandose en el puerto:", port);
});
