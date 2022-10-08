const addActa = require("express").Router();
const { Acta } = require("../db");

addActa.post("/", async (req, res) => {
  try {
    const { nro_mpf, nro_cij, nro_dil, nro_coop } = req.body;

    if (nro_mpf && nro_coop) {
      //* Si mandan ambos numeros manda error
      return res.status(400).send("No puede haber Nro MPF y Nro Coop");
    }

    if (!nro_mpf) {
      //* Valida que manden los datos necesarios
      if (!nro_coop || !nro_dil || !nro_cij) {
        return res.status(400).send("Falta enviar datos necesarios");
      }
    } else if (!nro_coop) {
      if (!nro_mpf || !nro_dil || !nro_cij) {
        return res.status(400).send("Falta enviar datos necesarios");
      }
    }

    const newActa = await Acta.create({
      //* Crea el acta
      nro_mpf,
      nro_cij,
      nro_dil,
      nro_coop,
    });

    return res.status(200).json(newActa);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addActa;
