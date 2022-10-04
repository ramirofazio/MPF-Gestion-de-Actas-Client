const updateEfecto = require("express").Router();
const { Acta, Efecto } = require("../db");

updateEfecto.post("/", async (req, res) => {
  const { actaId, efectosIds } = req.body;
  try {
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
  } catch (err) {
    console.log(err);
  }
});

module.exports = updateEfecto;
