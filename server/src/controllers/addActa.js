const { Router } = require("express");
const addActa = Router();
const { Acta, Efecto } = require("../db");

addActa.post("/", async (req, res, next) => {
  try {
    const {
      nro_mpf,
      nro_cij,
      nro_dil,
      nro_coop,
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
    const newActa = await Acta.create({
      nro_mpf,
      nro_cij,
      nro_dil,
      nro_coop,
    });
    await Efecto.findOrCreate({
      where: {
        acta_id: newActa?.dataValues.id,
      },
      defaults: {
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
      },
    });
    return res.status(200).json(newActa);
  } catch (error) {
    next(error);
  }
});

module.exports = addActa;
