const getEfectos = require("express").Router();
const { Efecto } = require("../db");

getEfectos.get("/", async (req, res) => {
  try {
    const { actaId, marca, precinto } = req.query;
    const efectos = await Efecto.findAll({ include: { all: true } }); //* Guardo todos los efectos

    let efectosFiltrados;
    if (marca && precinto) {
      //* Si existen ambos filtros
      efectosFiltrados = efectos.filter(
        (efecto) =>
          efecto.marca === marca &&
          efecto.Bolsa.nro_precinto === Number(precinto) &&
          efecto.Bolsa.acta_id === Number(actaId)
      );
    } else if (!marca && precinto) {
      efectosFiltrados = efectos.filter(
        (efecto) => efecto.Bolsa.nro_precinto === Number(precinto) && efecto.Bolsa.acta_id === Number(actaId)
      );
    } else if (marca && !precinto) {
      efectosFiltrados = efectos.filter((efecto) => efecto.marca === marca && efecto.Bolsa.acta_id === Number(actaId));
    }

    if (efectosFiltrados.length === 0) {
      const response = efectos.filter((efecto) => efecto.Bolsa.acta_id === Number(actaId));
      return res.status(201).json(response);
    }
    if (efectosFiltrados.length > 0) {
      return res.status(200).json(efectosFiltrados);
    }

    return res.status(200).json(efectos);
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

getEfectos.get("/:id", async (req, res) => {
  // * solo por ID
  const id = req.params.id; //* ID del acta

  try {
    const efectos = await Efecto.findAll({
      include: { all: true },
    });

    const response = efectos.filter((efecto) => efecto.Bolsa.acta_id === Number(id)); //* Busca los efectos del acta que nos pasan por params

    if (response !== null) {
      return res.status(200).send(response);
    } else {
      return res.status(404).send("Efecto not found or not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = getEfectos;
