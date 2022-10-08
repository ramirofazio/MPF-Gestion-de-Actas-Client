const getEfectos = require("express").Router();
const { Efecto } = require("../db");

getEfectos.get("/", async (req, res) => {
  try {
    const efectos = await Efecto.findAll({ include: { all: true } }); //* Guardo todos los efectos

    return res.status(200).json(efectos);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

getEfectos.get("/:id", async (req, res) => {
  //* solo por ID
  try {
    const id = req.params.id; //* me traigo el id del efecto

    const efecto = await Efecto.findByPk(id); //* Busco el efecto por ID y lo guardo

    return res.status(200).json(efecto);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = getEfectos;
