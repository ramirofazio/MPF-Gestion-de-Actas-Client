const addSim = require("express").Router();
const { Sim } = require("../db");

addSim.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const { nro_serie, nro_linea, tipo_extraccion, empresa } = req.body;

    if (!nro_linea || !tipo_extraccion || !empresa) {
      //* Valido que me manden los datos necesarios
      return res.status(400).send("Falta enviar datos necesarios");
    }

    const newSim = await Sim.create({
      //* Crea el Sim
      efecto_id,
      nro_serie,
      nro_linea,
      tipo_extraccion,
      empresa,
    });

    return res.status(200).json(newSim);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addSim;
