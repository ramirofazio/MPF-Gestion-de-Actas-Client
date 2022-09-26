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

    if (newSim !== null) {
      return res.status(200).send(newSim);
    } else {
      return res
        .status(404)
        .send("Sim no creado debido a que no existe el Acta con ID: " + efecto_id);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = addSim;
