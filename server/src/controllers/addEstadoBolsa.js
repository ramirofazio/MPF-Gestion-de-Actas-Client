const addEstadoBolsa = require("express").Router();
const { EstadoBolsa } = require("../db");

addEstadoBolsa.post("/:id", async (req, res) => {
  try {
    const bolsa_id = req.params.id;
    const newEstadoBolsa = await EstadoBolsa.create({
      bolsa_id: bolsa_id,
    });

    return res.status(200).send(newEstadoBolsa);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addEstadoBolsa;
