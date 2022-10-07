const addSim = require("express").Router();
const { Sim } = require("../db");

addSim.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const { nro_serie, nro_linea, tipo_extraccion, empresa } = req.body;

    const newSim = await Sim.create({
      efecto_id: efecto_id,
      nro_serie: nro_serie,
      nro_linea: nro_linea,
      tipo_extraccion: tipo_extraccion,
      empresa: empresa,
    });

    return res.status(200).json(newSim);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addSim;
