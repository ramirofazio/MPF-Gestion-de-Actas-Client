const actas = require("express").Router();
const Acta = require("../models/Acta");

//Muestra todas las actas
actas.get("/", async (req, res) => {
  try {
    const actas = await Acta.findAll();
    res.send(actas);
  } catch (error) {
    console.log(error);
  }
});

//Muestra una sola acta por ID
actas.get("/:id", async (req, res) => {
  const { id } = req.params;
  const actaPorId = await Acta.findByPk(id);
  res.json(actaPorId);
});

actas.post("/", async (req, res) => {
  const { nro_mpf, nro_cij, nro_dil, nro_coop } = req.body;
  const newActa = await Acta.create({
    nro_mpf: nro_mpf,
    nro_cij: nro_cij,
    nro_dil: nro_dil,
    nro_coop: nro_coop,
  });
  res.json(newActa);
});

module.exports = actas;
