const updateEfecto = require("express").Router();
const { Efecto, Bolsa, Acta, Integrante, Almacenamiento, Sim } = require("../db");

updateEfecto.post("/", async (req, res) => {
  const { acta } = req.body;
  try {
    const newActa = await Acta.create({
      ...acta,
      id: null,
    });
    const newBolsa = await Bolsa.create({ ...acta.Bolsas, id: null, acta_id: newActa.id });

    /*
      ! Hay que poder modificar todos los estados del acta, y crear una copia con los estados "completos" de los efectos que selecciono el FE
    */
  } catch (err) {
    console.log(err);
  }
});

module.exports = updateEfecto;
