const getActas = require("express").Router();
const { Acta, Efecto, Sim, Estado, Almacenamiento } = require("../db");

getActas.get("/", async (req, res) => {
  //Todas las actas
  try {
    console.log("todas");
    const actas = await Acta.findAll({
      include: [{ model: Efecto, include: [Sim, Estado, Almacenamiento] }],
    });

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
      include: [{ model: Efecto, include: [Sim, Estado, Almacenamiento] }],
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
