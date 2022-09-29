const updateEfecto = require("express").Router();
const { Efecto, Bolsa, Acta, Integrante, Almacenamiento, Sim } = require("../db");

updateEfecto.post("/", async (req, res) => {
  const { efecto } = req.body;
  const efectoId = efecto.id;

  try {
    //* Busco el acta y destructuring
    const { nro_mpf, nro_cij, nro_dil, nro_coop, estado, Bolsas, Integrantes } =
      await Acta.findByPk(efecto.Bolsa.acta_id, {
        include: [{ all: true, nested: true }],
      });

    const newActa = await Acta.create({
      //* Crea una copia del acta
      nro_mpf: nro_mpf,
      nro_cij: nro_cij,
      nro_dil: nro_dil,
      nro_coop: nro_coop,
      estado: estado,
    });

    Integrantes.map(async (integrante) => {
      //* Mapeo los integrantes del acta, busco cada uno y creo una copia a partir de eso
      const { nombre, cargo_o_profesion, dni, domicilio, matricula } = await Integrante.findByPk(
        integrante.id,
        {
          include: [{ all: true, nested: true }],
        }
      );

      await Integrante.create({
        acta_id: newActa.id,
        nombre,
        cargo_o_profesion,
        dni,
        domicilio,
        matricula,
      });
    });

    Bolsas.map(async (bolsa) => {
      //* Mapeo las bolsas del acta, busco cada una y creo una copia a partir de eso
      const { nro_precinto, color_precinto, notas, estado, Efectos } = await Bolsa.findByPk(
        bolsa.id,
        {
          include: [{ all: true, nested: true }],
        }
      );

      const newBolsa = await Bolsa.create({
        acta_id: newActa.id,
        nro_precinto: nro_precinto,
        color_precinto: color_precinto,
        notas: notas,
        estado: estado,
      });

      Efectos.map(async (efecto) => {
        //* Mapeo los efectos de la bolsa, busco cada uno y creo una copia a partir de eso
        const {
          id: thisId,
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
          estado,
          Almacenamientos,
          Sims,
        } = await Efecto.findByPk(efecto.id, {
          include: [{ all: true, nested: true }],
        });

        let flag = false;
        if (thisId === efectoId) {
          //* Si coinciden los IDS pone la flag en true
          flag = true;
        }

        const newEfecto = await Efecto.create({
          bolsa_id: newBolsa.id,
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
          estado: flag ? "Completo" : "Parcial", //* Si la flag esta en true completa el efecto
        });

        Almacenamientos.map(async (almacenamiento) => {
          //* Mapeo los almacenamientos del efecto, busco cada uno y creo una copia a partir de eso
          const { marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie } =
            await Almacenamiento.findByPk(almacenamiento.id, {
              include: [{ all: true, nested: true }],
            });

          await Almacenamiento.create({
            efecto_id: newEfecto.id,
            marca,
            modelo,
            capacidad,
            tipo_extraccion,
            tipo_almacenamiento,
            nro_serie,
          });
        });

        Sims.map(async (sim) => {
          //* Mapeo los almacenamientos del efecto, busco cada uno y creo una copia a partir de eso
          const { nro_serie, nro_linea, tip_extraccion, empresa } = await Sim.findByPk(sim.id, {
            include: [{ all: true, nested: true }],
          });

          await Sim.create({
            efecto_id: newEfecto.id,
            nro_serie,
            nro_linea,
            tip_extraccion,
            empresa,
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = updateEfecto;
/*
  ! Logica para actualizar estado automatico sin crear otra acta
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
*/
