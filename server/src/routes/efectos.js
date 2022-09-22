const efectos = require("express").Router();
const Efecto = require("../models/Efecto");

efectos.get("/", async (req, res) => {
  try {
    const efectos = await Efecto.findAll();
    res.json(efectos);
  } catch (error) {
    console.log("this error", error);
  }
});

efectos.post("/", async (req, res) => {
  const { nro_precinto, color_precinto, tipo, color, tipo_extraccion, nro_serie, tipo_desbloqueo, notas, IMEI, modelo, marca } = req.body;
  const newEfecto = await Efecto.create({
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
  res.json(newEfecto);
});

module.exports = efectos;
