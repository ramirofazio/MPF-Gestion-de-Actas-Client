const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/", async (req, res) => {
  try {
    const {
      bolsa_id,
      tipoDeElemento,
      marca,
      modelo,
      imei,
      imei2,
      estado,
      sistemaOperativo,
      seguridad,
      tipoSeguridad,
      desbloqueo,
      herramientaSoft,
      tipoExtraccion,
      descripcionTarea,
    } = req.body;

    console.log(
      bolsa_id,
      tipoDeElemento,
      marca,
      modelo,
      imei,
      imei2,
      estado,
      sistemaOperativo,
      seguridad,
      tipoSeguridad,
      desbloqueo,
      herramientaSoft,
      tipoExtraccion,
      descripcionTarea
    );

    const newEfecto = await Efecto.create({
      bolsa_id,
      tipoDeElemento,
      marca,
      modelo,
      imei,
      imei2,
      sistemaOperativo,
      seguridad,
      tipoSeguridad,
      desbloqueo,
      herramientaSoft,
      tipoExtraccion,
      descripcionTarea,
      estado
    });

    return res.status(200).json(newEfecto);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addEfecto;
