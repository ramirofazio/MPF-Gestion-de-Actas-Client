const updateBolsa = require("express").Router();
const { Bolsa } = require("../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, id } = req.body;

  try {
    const bolsa = await Bolsa.findByPk(id);
    await bolsa.update({ nroPrecintoBlanco });

    res.status(200).json("Bolsa actualizada correctamente", bolsa);
  } catch (err) {
    console.log(err);
  }
});

module.exports = updateBolsa;
