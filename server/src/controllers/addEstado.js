const addEstado = require("express").Router();
const { Estado } = require("../db");

addEstado.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const newEstado = await Estado.create({
      EfectoId: efecto_id,
    });

    return res.status(200).send(newEstado);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addEstado;
