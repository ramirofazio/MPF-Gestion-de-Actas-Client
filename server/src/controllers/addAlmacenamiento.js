const addAlmacenamiento = require("express").Router();
const { Almacenamiento } = require("../db");

addAlmacenamiento.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const { marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie } = req.body;

    const newAlmacenamiento = await Almacenamiento.create({
      efecto_id: efecto_id,
      marca,
      modelo,
      capacidad,
      tipo_extraccion,
      tipo_almacenamiento,
      nro_serie,
    });

    return res.status(200).json(newAlmacenamiento);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addAlmacenamiento;
