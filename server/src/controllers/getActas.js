const getActas = require("express").Router();
const { Acta, Efecto, Sim, EstadoEfecto, EstadoBolsa, Almacenamiento, Bolsa } = require("../db");

getActas.get("/", async (req, res) => {
  //Todas las actas
  try {
    console.log("todas");
    const actas = await Acta.findAll({ include: { all: true, nested: true } });

    return res.status(200).send(actas);
  } catch (error) {
    console.log(error);
  }
});

getActas.get("/:id", async (req, res) => {
  //1 sola por ID
  const acta_id = req.params.id;
  try {
    console.log("acta by PK");
    const acta = await Acta.findByPk(acta_id, {
      include: [
        {
          model: Bolsa,
          include: [{ model: Efecto, include: [Sim, EstadoEfecto, Almacenamiento] }],
        },
      ],
    });
    if (acta !== null) {
      return res.status(200).send(acta);
    } else {
      return res.status(404).send("Acta not found or not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = getActas;
