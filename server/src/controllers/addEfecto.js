const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/:id", async (req, res) => {
  try {
    const bolsa_id = req.params.id;
    const { tipo, color, tipo_extraccion, nro_serie, tipo_desbloqueo, notas, IMEI, modelo, marca, sofware } = req.body;

    if (!tipo || !tipo_extraccion || !modelo || !marca || !sofware) {
      //* Valido que me manden los datos necesarios
      return res.status(400).send("Falta enviar datos necesarios");
    }

    const newEfecto = await Efecto.create({
      //* Crea el Efecto
      bolsa_id,
      tipo,
      color,
      tipo_extraccion,
      nro_serie,
      tipo_desbloqueo,
      notas,
      IMEI,
      modelo,
      marca,
      sofware,
    });

    return res.status(200).json(newEfecto);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = addEfecto;
