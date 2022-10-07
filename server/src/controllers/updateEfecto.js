const updateEfecto = require("express").Router();
const { Acta, Efecto, Bolsa, Almacenamiento, Integrante, Sim } = require("../db");

updateEfecto.post("/", async (req, res) => {
  const { actaId, efectosIds } = req.body;

  try {
    //! Logica para deprecar el Acta
    const acta = await Acta.findByPk(actaId, { include: { all: true, nested: true } });

    acta.Bolsas.map((bolsa) => {
      let efectosCompletos = 0; //* contador para completar o no la Bolsa
      //* Mapeo las bolsas
      bolsa.Efectos.map((efecto) => {
        if (efecto.estado === "completo") {
          //* Si estan todos los efectos completos, pongo flag en true y salgo
          efectosCompletos++;
        } else {
          //* Mapeo los efectos
          const flag = efectosIds.find((id) => id === efecto.id); //* Genero una flag booleana para ver si es o no el efecto

          if (flag) {
            //* Si encontro el efecto lo completa, sino le pone deprecado
            efecto.estado = "completo";
            efectosCompletos++;
          } else {
            efecto.estado = "deprecado";
          }
          efecto.save();
        }
      });

      if (efectosCompletos == bolsa.Efectos.length) {
        //* Si todos los efectos estan completos, completo al bolsa, sino la dejo deprecada
        bolsa.estado = "completo";
      } else {
        bolsa.estado = "deprecado";
      }
      bolsa.save();
    });

    let bolsasCompletas = 0;
    acta.Bolsas.map((bolsa) => {
      bolsa.estado === "completo" ? bolsasCompletas++ : null;
    });

    if (bolsasCompletas == acta.Bolsas.length) {
      acta.estado = "completo";
    } else {
      acta.estado = "deprecado";
    }
    acta.save(); //* Salvo los cambios del acta, bolsas y efectos

    if (acta.estado === "completo") {
      //* Si el acta ya se comlpleto cuando se modifico, no vuelve a crear otra.
      return res.status(200).send("Acta completa");
    }
    //! Logica para crear una copia
    const { nro_mpf, nro_cij, nro_dil, nro_coop, estado } = acta; //* Destructuro el acta

    const newActa = await Acta.create({
      //* Creo la copia del acta
      nro_mpf,
      nro_cij,
      nro_dil,
      nro_coop,
      estado: estado === "deprecado" ? "en proceso" : "completo", //* Si el estado esta en deprecado, significa que sigue en proceso, sino esta completa
    });

    acta.Integrantes.map(
      //* Mapeo los Integrantes del acta original, y junto los datos para duplicarlos
      async ({ nombre, cargo_o_profesion, dni, domicilio, matricula }) => {
        await Integrante.create({
          //* Creo la copia del integrante
          acta_id: newActa.id,
          nombre,
          cargo_o_profesion,
          dni,
          domicilio,
          matricula,
        });
      }
    );

    acta.Bolsas.map(
      //* Mapeo las bolsas del acta original, y junto los datos para duplicarlos
      async ({ nro_precinto, color_precinto, notas, nro_precinto_blanco, estado, Efectos }) => {
        const newBolsa = await Bolsa.create({
          //* Creo la copia de la bolsa
          acta_id: newActa.id,
          nro_precinto,
          color_precinto,
          notas,
          nro_precinto_blanco,
          estado: estado === "deprecado" ? "en proceso" : "completo",
        });

        Efectos.map(
          //* Mapeo los Efectos de la bolsa original, y junto los datos para duplicarlos
          async ({
            tipo,
            color,
            tipo_extraccion,
            nro_serie,
            tipo_desbloqueo,
            IMEI,
            modelo,
            marca,
            notas,
            sofware,
            estado,
            Almacenamientos,
            Sims,
          }) => {
            const newEfecto = await Efecto.create({
              //* Creo la copia del Efecto
              bolsa_id: newBolsa.id,
              tipo,
              color,
              tipo_extraccion,
              nro_serie,
              tipo_desbloqueo,
              IMEI,
              modelo,
              marca,
              notas,
              sofware,
              estado: estado === "deprecado" ? "en proceso" : "completo",
            });

            Almacenamientos.map(
              //* Mapeo los Almacenamientos del Efecto original, y junto los datos para duplicarlos
              async ({ marca, modelo, capacidad, tipo_extraccion, tipo_almacenamiento, nro_serie }) => {
                await Almacenamiento.create({
                  //* Creo la copia de los Alm...
                  efecto_id: newEfecto.id,
                  marca,
                  modelo,
                  capacidad,
                  tipo_extraccion,
                  tipo_almacenamiento,
                  nro_serie,
                });
              }
            );

            Sims.map(
              //* Mapeo los Sims del Efecto original, y junto los datos para duplicarlos
              async ({ nro_serie, nro_linea, tipo_extraccion, empresa }) => {
                await Sim.create({
                  //* Creo la copia de los Sim
                  efecto_id: newEfecto.id,
                  nro_serie,
                  nro_linea,
                  tipo_extraccion,
                  empresa,
                });
              }
            );
          }
        );
      }
    );
    return res.status(200).send("Acta completada con exito!");
  } catch (err) {
    return res.status(404).send("Algo salio mal. Error \n\n -------> ", err);
  }
});

module.exports = updateEfecto;
