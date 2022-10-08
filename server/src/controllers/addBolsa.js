const addBolsa = require("express").Router();
const { Bolsa } = require("../db");

addBolsa.post("/:id", async (req, res) => {
  try {
    const acta_id = req.params.id;
    const { nro_precinto, color_precinto, notas } = req.body;

    if (!nro_precinto || !color_precinto) {
      //* Valido que me manden todos datos
      return res.status(400).send("Falta enviar datos necesarios");
    }

    const newBolsa = await Bolsa.create({
      //* Crea la Bolsa
      acta_id,
      nro_precinto,
      color_precinto,
      notas,
    });

    return res.status(200).json(newBolsa);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addBolsa;
