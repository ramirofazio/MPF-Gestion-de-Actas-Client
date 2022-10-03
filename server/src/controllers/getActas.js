const getActas = require("express").Router();
const { Acta } = require("../db");

getActas.get("/", async (req, res) => {
  //Todas las actas
  const enProceso = req.query.enproceso; //* traigo query param
  try {
    console.log("todas");
    const actas = await Acta.findAll({ include: { all: true, nested: true } });
    const actasEnProceso = actas.filter((acta) => acta.estado === "en proceso"); //* Filtro las actas en proceso

    if (enProceso) {
      return res.status(200).send(actasEnProceso);
    } else {
      return res.status(200).send(actas);
    }
  } catch (error) {
    console.log(error);
  }
});

getActas.get("/:id", async (req, res) => {
  //1 sola por ID
  const acta_id = req.params.id;
  try {
    console.log("acta by PK");
    const acta = await Acta.findByPk(acta_id, { include: { all: true, nested: true } });
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
