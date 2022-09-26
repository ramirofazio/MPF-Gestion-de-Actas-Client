const addEstadoEfecto = require("express").Router();
const { EstadoEfecto } = require("../db");

addEstadoEfecto.post("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    const newEstadoEfecto = await EstadoEfecto.create({
      efecto_id: efecto_id,
    });

    return res.status(200).send(newEstadoEfecto);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addEstadoEfecto;
