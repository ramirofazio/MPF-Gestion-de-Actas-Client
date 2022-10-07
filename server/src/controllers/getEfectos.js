const getEfectos = require("express").Router();
const { Efecto } = require("../db");

getEfectos.get("/", async (req, res) => {
  //* todos los efectos
  try {
    const efectos = await Efecto.findAll({ include: { all: true } });
    return res.status(200).json(efectos);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

getEfectos.get("/:id", async (req, res) => {
  // * solo por ID
  try {
    const id = req.params.id;

    const efectos = await Efecto.findAll({
      include: { all: true },
    });

    const response = efectos.filter((efecto) => efecto.Bolsa.acta_id === Number(id));
    if (response !== null) {
      return res.status(200).json(response);
    } else {
      return res.status(404).send("Efecto not found or not exist");
    }
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = getEfectos;
