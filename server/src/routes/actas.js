const actas = require("express").Router();
const Acta = require("../models/Acta");

//Todas las actas
actas.get("/", async (req, res) => {
  const actas = await Acta.findAll();
  res.json(actas);
});

//Una sola acta por ID
actas.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id: Number(id),
  });
});

module.exports = actas;
