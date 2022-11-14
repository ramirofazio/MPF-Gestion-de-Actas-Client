const addAlmacenamiento = require("express").Router();
const { Almacenamiento } = require("../db");

addAlmacenamiento.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const { marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie } = req.body;

    if (!marca || !modelo || !capacidad || !tipo_extraccion || !tipo_almacenamiento || !nro_serie) {
      //* Valido que me manden todos los datos
      return res.status(400).send("Falta enviar datos necesarios");
    }

    const newAlmacenamiento = await Almacenamiento.create({
      //* Crea el Almacenamiento
      efecto_id,
      marca,
      modelo,
      capacidad,
      tipo_extraccion,
      tipo_almacenamiento,
      nro_serie,
    });

    return res.status(200).json(newAlmacenamiento);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addAlmacenamiento;
