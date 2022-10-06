const getActas = require("express").Router();
const { Acta } = require("../db");

getActas.get("/", async (req, res, next) => {
  //* Todas las actas
  try {
    const { enProceso, mpf, cij, dil } = req.query; //* traigo query param
    const actas = await Acta.findAll({ include: { all: true, nested: true } });
    const actasEnProceso = actas.filter((acta) => acta.estado === "en proceso"); //* Filtro las actas en proceso

    if (enProceso) {
      //* devuelve todas las actas en proces, con o sin filtros
      let actasFiltradas;
      if (mpf && cij && dil) {
        const filter = actasEnProceso.filter(
          (acta) =>
            acta.nro_mpf === Number(mpf) &&
            acta.nro_cij === Number(cij) &&
            acta.nro_dil === Number(dil)
        );
        actasFiltradas = filter;
      } else if (mpf && cij && !dil) {
        const filter = actasEnProceso.filter(
          (acta) => acta.nro_mpf === Number(mpf) && acta.nro_cij === Number(cij)
        );
        actasFiltradas = filter;
      } else if (mpf && !cij && dil) {
        const filter = actasEnProceso.filter(
          (acta) => acta.nro_mpf === Number(mpf) && acta.nro_dil === Number(dil)
        );
        actasFiltradas = filter;
      } else if (!mpf && cij && dil) {
        const filter = actasEnProceso.filter(
          (acta) => acta.nro_cij === Number(cij) && acta.nro_dil === Number(dil)
        );
        actasFiltradas = filter;
      } else if (mpf && !cij && !dil) {
        const filter = actasEnProceso.filter((acta) => acta.nro_mpf === Number(mpf));
        actasFiltradas = filter;
      } else if (!mpf && cij && !dil) {
        const filter = actasEnProceso.filter((acta) => acta.nro_cij === Number(cij));
        actasFiltradas = filter;
      } else if (!mpf && !cij && dil) {
        const filter = actasEnProceso.filter((acta) => acta.nro_dil === Number(dil));
        actasFiltradas = filter;
      } else {
        return res.status(200).send(actasEnProceso);
      }
      if (actasFiltradas.length === 0) {
        console.log("entre");
        return res.status(201).send(actasEnProceso);
      }
      return res.status(200).send(actasFiltradas);
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
