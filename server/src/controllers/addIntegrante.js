const addIntegrante = require("express").Router();
const { Integrante } = require("../db");

addIntegrante.post("/:id", async (req, res) => {
  try {
    const acta_id = req.params.id;
    const { nombre, cargo_o_profesion, dni, domicilio, matricula } = req.body;
    const newIntegrante = await Integrante.create({
      acta_id: acta_id,
      nombre,
      cargo_o_profesion,
      dni,
      domicilio,
      matricula,
    });

    return res.status(200).json(newIntegrante);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addIntegrante;
