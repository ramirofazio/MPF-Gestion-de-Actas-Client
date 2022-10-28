const addIntegrantes = require("express").Router();
const { Integrante } = require("../db");

addIntegrantes.post("/", async (req, res) => {
  try {
    const integrantes = req.body;

    const newIntegrantes = await Integrante.bulkCreate(integrantes);

    return res.status(200).json(newIntegrantes);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addIntegrantes;
