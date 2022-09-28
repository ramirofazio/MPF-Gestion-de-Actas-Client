const putEfecto = require("express").Router();
const { Efecto, Bolsa, Acta } = require("../db");

putEfecto.put("/:id", async (req, res) => {
  try {
    const efecto_id = req.params.id;
    //* busco el efecto por ID, le cambio el estado y lo guardo
    const efecto = await Efecto.findByPk(efecto_id);
    efecto.estado = "Completo";
    await efecto.save();
    //* busco la bolsa con el ID, le incluyo los efectos
    const bolsa = await Bolsa.findByPk(efecto.bolsa_id, { include: [Efecto] });
    //* Declaro contador, sumo los que esten completados y comparo con el total, si es igual actualizo el estado de la bolsa
    let cantEfectosCompletados = 0;
    bolsa.Efectos.map((efecto) => {
      efecto.estado === "Completo" ? cantEfectosCompletados++ : null;
    });
    if (cantEfectosCompletados === bolsa.Efectos.length) {
      bolsa.estado = "Completo";
      await bolsa.save();
      //* busco el Acta con el ID, le incluyo las bolsas
      const acta = await Acta.findByPk(bolsa.acta_id, { include: [Bolsa] });
      //* Declaro contador, sumo las bolsas que esten completados y comparo con el total, si es igual actualizo el estado del Acta
      let cantBolsasCompletadas = 0;
      acta.Bolsas.map((bolsa) => {
        bolsa.estado === "Completo" ? cantBolsasCompletadas++ : null;
      });
      console.log("todos los efectos completados!");

      if (cantBolsasCompletadas === acta.Bolsas.length) {
        acta.estado = "Completo";
        await acta.save();
        return res.status(200).send("todas las bolsas completadas!");
      } else {
        return res
          .status(202)
          .send(
            `faltan ${acta.Bolsas.length - cantBolsasCompletadas} bolsas para completar el Acta`
          );
      }
    } else {
      return res
        .status(202)
        .send(
          `faltan ${bolsa.Efectos.length - cantEfectosCompletados} efectos para completar la bolsa`
        );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = putEfecto;
