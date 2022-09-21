const express = require("express");
const cors = require("cors");
const db = require("./src/db/database");
const actas = require("./src/routes/actas");

const app = express();
const port = 3030;

(async () => {
  try {
    await db.authenticate(); //Conecta la DB
    await db.sync(); //Sincroniza las tablas
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
})();

db.authenticate().then(() => {});

//middlewares
app.use(express.json()); //Recibir info
app.use(cors()); //habilita otras apps para realizar solicitudes

//Routes
app.use("/actas", actas);

app.listen(port, () => {
  console.log("servidor ejecutandose en el puerto:", port);
});
