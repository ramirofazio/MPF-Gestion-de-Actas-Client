const addActa = require("express").Router();
const { Acta } = require("../db");

addActa.post("/", async (req, res) => {
  try {
    const { nro_mpf, nro_cij, nro_dil, nro_coop } = req.body;
    const newActa = await Acta.create({
      nro_mpf,
      nro_cij,
      nro_dil,
      nro_coop,
    });

    return res.status(200).json(newActa);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addActa;