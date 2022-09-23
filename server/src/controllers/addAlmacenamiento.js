const addAlmacenamiento = require("express").Router();
const { Almacenamiento } = require("../db");

addAlmacenamiento.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const { marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie } = req.body;
    const newAlmacenamiento = await Almacenamiento.create({
      EfectoId: efecto_id,
      marca,
      modelo,
      capacidad,
      tipo_extraccion,
      tipo_almacenamiento,
      nro_serie,
    });

    return res.status(200).send(newAlmacenamiento);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addAlmacenamiento;
