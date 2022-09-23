const getActa = require("express").Router();
const { Acta, Efecto } = require("../db");

getActa.get("/", async (req, res, next) => {
  try {
    const acta = await Acta.findAll({
      include: [{ model: Efecto }],
    });

    return res.status(200).send(acta);
  } catch (error) {
    next(error);
  }
});

module.exports = getActa;
