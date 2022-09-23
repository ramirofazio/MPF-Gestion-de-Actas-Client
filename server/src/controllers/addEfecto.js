const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/:id", async (req, res) => {
  try {
    const acta_id = req.params.id;
    const {
      nro_precinto,
      color_precinto,
      tipo,
      color,
      tipo_extraccion,
      nro_serie,
      tipo_desbloqueo,
      notas,
      IMEI,
      modelo,
      marca,
    } = req.body;
    const newEfecto = await Efecto.create({
      acta_id: acta_id,
      nro_precinto: nro_precinto,
      color_precinto: color_precinto,
      tipo: tipo,
      color: color,
      tipo_extraccion: tipo_extraccion,
      nro_serie: nro_serie,
      tipo_desbloqueo: tipo_desbloqueo,
      notas: notas,
      IMEI: IMEI,
      modelo: modelo,
      marca: marca,
    });

    return res.status(200).send(newEfecto);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addEfecto;
