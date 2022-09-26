const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/:id", async (req, res) => {
  try {
    const bolsa_id = req.params.id;
    const { tipo, color, tipo_extraccion, nro_serie, tipo_desbloqueo, notas, IMEI, modelo, marca } =
      req.body;
    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
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
