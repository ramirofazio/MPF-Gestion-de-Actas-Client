const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/:id", async (req, res) => {
  try {
    const bolsa_id = req.params.id;
    const {
      tipo,
      color,
      tipo_extraccion,
      nro_serie,
      tipo_desbloqueo,
      notas,
      IMEI,
      modelo,
      marca,
      sofware,
    } = req.body;

    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
      tipo,
      color,
      tipo_extraccion,
      nro_serie,
      tipo_desbloqueo,
      notas,
      IMEI,
      modelo,
      marca,
      sofware,
    });

    return res.status(200).json(newEfecto);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addEfecto;
