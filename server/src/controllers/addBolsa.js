const addBolsa = require("express").Router();
const { Bolsa } = require("../db");

addBolsa.post("/", async (req, res) => {
  try {
    const { acta_id, colorPrecinto, nroPrecinto, observaciones } = req.body;

    const newBolsa = await Bolsa.create({
      acta_id,
      colorPrecinto,
      nroPrecinto: Number(nroPrecinto),
      observaciones,
    });

    return res.status(200).json(newBolsa);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addBolsa;
