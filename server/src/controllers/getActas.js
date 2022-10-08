const getActas = require("express").Router();
const { Acta } = require("../db");

getActas.get("/", async (req, res) => {
  try {
    const { enProceso, mpf, cij, dil } = req.query;

    const actas = await Acta.findAll({ include: { all: true, nested: true } }); //* Guardo todas las actas con todas sus tablas

    if (enProceso) {
      //* Devuelve todas las actas en proceso, con o sin filtros
      const actasEnProceso = actas.filter((acta) => acta.estado === "en proceso"); //* Guardo las actas en proceso
      let actasFiltradas;

      //* Empiezan filtros
      if (mpf && cij && dil) {
        //* Si tiene todos
        const filter = actasEnProceso.filter(
          (acta) => acta.nro_mpf === Number(mpf) && acta.nro_cij === Number(cij) && acta.nro_dil === Number(dil)
        );
        actasFiltradas = filter;
      } else if (mpf && cij && !dil) {
        //* Si tiene mpf y cij
        const filter = actasEnProceso.filter((acta) => acta.nro_mpf === Number(mpf) && acta.nro_cij === Number(cij));
        actasFiltradas = filter;
      } else if (mpf && !cij && dil) {
        //*si tiene mpf y dil
        const filter = actasEnProceso.filter((acta) => acta.nro_mpf === Number(mpf) && acta.nro_dil === Number(dil));
        actasFiltradas = filter;
      } else if (!mpf && cij && dil) {
        //* si tiene cij y dil
        const filter = actasEnProceso.filter((acta) => acta.nro_cij === Number(cij) && acta.nro_dil === Number(dil));
        actasFiltradas = filter;
      } else if (mpf && !cij && !dil) {
        //* si tiene solo mpf
        const filter = actasEnProceso.filter((acta) => acta.nro_mpf === Number(mpf));
        actasFiltradas = filter;
      } else if (!mpf && cij && !dil) {
        //* si tiene solo cij
        const filter = actasEnProceso.filter((acta) => acta.nro_cij === Number(cij));
        actasFiltradas = filter;
      } else if (!mpf && !cij && dil) {
        //*si tiene solo dil
        const filter = actasEnProceso.filter((acta) => acta.nro_dil === Number(dil));
        actasFiltradas = filter;
      } else if (!mpf && !cij && !dil) {
        //* Si no mandan nada devuelvo todas actas en proceso
        return res.status(200).json(actasEnProceso);
      }

      if (actasEnProceso.length === 0) {
        //* Si los filtros no encuentran nada devuelve todas en proceso
        return res.status(201).json(actasEnProceso);
      }

      return res.status(200).json(actasFiltradas); //* Si llego hasta aca es porque los filtros encontraron, devuelve
    } else {
      //* Si no me pasaron enProceso === true devuelvo todas las actas
      return res.status(200).json(actas);
    }
  } catch (err) {
    return res.status(400).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = getActas;
