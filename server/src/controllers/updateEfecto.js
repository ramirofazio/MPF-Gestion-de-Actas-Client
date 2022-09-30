const updateEfecto = require("express").Router();
const { Efecto, Bolsa, Acta, Integrante, Almacenamiento, Sim } = require("../db");

updateEfecto.post("/", async (req, res) => {
  const { efectos } = req.body;
  efectos.map(async (ef) => {
    try {
      const efectoID = ef.id;
      const actaID = ef.Bolsa.acta_id;
      //* cambia todos los estados a deprecados
      const bolsas = await Bolsa.findAll({
        where: { acta_id: ef.Bolsa.acta_id },
        include: [Efecto],
      });

      bolsas.map(async (bolsa) => {
        bolsa.estado = "deprecado";
        await bolsa.save();

        bolsa.Efectos.map(async (ef) => {
          const efecto = await Efecto.findByPk(ef.id);
          efecto.estado = "deprecado";
          await efecto.save();
        });

        const acta = await Acta.findByPk(bolsa.acta_id, {
          include: [{ all: true, nested: true }],
        });
        acta.estado = "deprecado";
        await acta.save();
      });
      //* Nueva creacion
      console.log(actaID);
      const { nro_mpf, nro_cij, nro_dil, nro_coop, Bolsas, Integrantes } = await Acta.findByPk(
        actaID,
        {
          include: [{ all: true, nested: true }],
        }
      ); //* Destructuring
      console.log("---------->", nro_mpf, nro_cij, nro_dil, nro_coop, Bolsas, Integrantes);
      const newActa = await Acta.create({
        //* Crea una copia del acta
        nro_mpf,
        nro_cij,
        nro_dil,
        nro_coop,
        Integrantes,
      });

      // Integrantes.map(async (integrante) => {
      //   //* Mapeo los integrantes del acta, busco cada uno y creo una copia a partir de eso
      //   const { nombre, cargo_o_profesion, dni, domicilio, matricula } = await Integrante.findByPk(
      //     integrante.id,
      //     {
      //       include: [{ all: true, nested: true }],
      //     }
      //   );

      //   await Integrante.create({
      //     acta_id: newActa.id,
      //     nombre,
      //     cargo_o_profesion,
      //     dni,
      //     domicilio,
      //     matricula,
      //   });
      // });

      Bolsas.map(async (bolsa) => {
        //* Mapeo las bolsas del acta, busco cada una y creo una copia a partir de eso
        const { nro_precinto, color_precinto, notas, Efectos } = await Bolsa.findByPk(bolsa.id, {
          include: [{ all: true, nested: true }],
        });

        const newBolsa = await Bolsa.create({
          acta_id: newActa.id,
          nro_precinto: nro_precinto,
          color_precinto: color_precinto,
          notas: notas,
        });

        Efectos.map(async (ef) => {
          //* Mapeo los efectos de la bolsa, busco cada uno y creo una copia a partir de eso
          const {
            id: thisId, //* Alias para el ID
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
            Almacenamientos,
            Sims,
          } = await Efecto.findByPk(ef.id, {
            include: [{ all: true, nested: true }],
          });
          let newEfecto_id;

          if (efectoID === thisId) {
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
              estado: "completo",
            });
            newEfecto_id = newEfecto.id;
          } else {
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
            });
            newEfecto_id = newEfecto.id;
          }

          Almacenamientos.map(async (almacenamiento) => {
            //* Mapeo los almacenamientos del efecto, busco cada uno y creo una copia a partir de eso
            const { marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie } =
              await Almacenamiento.findByPk(almacenamiento.id, {
                include: [{ all: true, nested: true }],
              });

            await Almacenamiento.create({
              efecto_id: newEfecto_id,
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
              efecto_id: newEfecto_id,
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
});

module.exports = updateEfecto;
