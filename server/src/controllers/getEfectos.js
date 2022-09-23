const getEfectos = require("express").Router();
const { Efecto, Sim, Estado, Almacenamiento } = require("../db");

getEfectos.get("/", async (req, res, next) => {
  //Todos los efectos
  try {
    const efectos = await Efecto.findAll({
      include: [Sim, Estado, Almacenamiento],
    });
    return res.status(200).send(efectos);
  } catch (error) {
    next(error);
  }
});

getEfectos.get("/:id", async (req, res) => {
  //1 solo por ID
  const efecto_id = req.params.id;
  try {
    const efecto = await Efecto.findByPk(efecto_id, {
      include: [Sim, Estado, Almacenamiento],
    });
    if (efecto !== null) {
      return res.status(200).send(efecto);
    } else {
      return res.status(404).send("Efecto not found or not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = getEfectos;
