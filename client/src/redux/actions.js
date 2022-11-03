import axios from "axios";
import Variables from "../Styles/Variables";

export const GET_ACTAS = "GET_ACTAS";
export const GET_ACTAS_FILTERED = "GET_ACTAS_FILTERED";
export const GET_EFECTOS = "GET_EFECTOS";
export const GET_ACTAS_EN_PROCESO = "GET_ACTAS_EN_PROCESO";
export const GET_ACTAS_EN_PROCESO_FILTERED = "GET_ACTAS_EN_PROCESO_FILTERED";
export const GET_EFECTOS_EN_PROCESO_FILTERED = "GET_EFECTOS_EN_PROCESO_FILTERED";
export const GET_EFECTOS_FROM_ACTA = "GET_EFECTOS_FROM_ACTA";
export const CREATE_ACTA = "CREATE_ACTA";
export const CREATE_INTEGRANTES = "CREATE_INTEGRANTES";
export const CREATE_BOLSAS = "CREATE_BOLSAS";
export const CREATE_EFECTOS = "CREATE_EFECTOS";

export function getAllActas() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas")
      .then((res) => {
        return dispatch({
          type: GET_ACTAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasFiltered(filtros) {
  return function (dispatch) {
    return dispatch({
      type: GET_ACTAS_FILTERED,
      payload: filtros,
    });
  };
}

export function getAllEfectos() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getEfectos")
      .then((res) => {
        return dispatch({
          type: GET_EFECTOS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getEfectosFromActa(id) {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + `/getEfectos/${id}`)
      .then((res) => {
        return dispatch({
          type: GET_EFECTOS_FROM_ACTA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasEnProceso() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas?enProceso=true")
      .then((res) => {
        return dispatch({
          type: GET_ACTAS_EN_PROCESO,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasEnProcesoFiltered(filtros) {
  return function (dispatch) {
    return dispatch({
      type: GET_ACTAS_EN_PROCESO_FILTERED,
      payload: filtros,
    });
  };
}

export function getEfectosEnProcesoFiltered(filtros) {
  return function (dispatch) {
    return dispatch({
      type: GET_EFECTOS_EN_PROCESO_FILTERED,
      payload: filtros,
    });
  };
}

export function sendEfectosIdsAndActaId({ actaId, efectosIds }) {
  axios
    .post(Variables.baseEndpoint + "/updateEfecto", { actaId, efectosIds })

    .catch((err) => {
      console.log(err);
    });
}

export function createActa(state, flag) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addActa", { ...state })
      .then((res) => {
        return dispatch({
          type: CREATE_ACTA,
          payload: { ...res.data, flag },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createIntegrantes(integrantes) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addIntegrantes", integrantes)
      .then((res) => {
        return dispatch({
          type: CREATE_INTEGRANTES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createBolsas(bolsa) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addBolsa", bolsa)
      .then((res) => {
        return dispatch({
          type: CREATE_BOLSAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createEfecto(efecto) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + `/addEfecto?id=${efecto.bolsa_id}`, efecto)
      .then((res) => {
        return dispatch({
          type: CREATE_EFECTOS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export async function loadDB() {
  try {
    for (let i = 0; i < 5; i++) {
      let acta;
      try {
        await axios
          .post(Variables.baseEndpoint + "/addActa", {
            nro_cij: Math.floor(Math.random() * 1000000 + 10000),
            nro_dil: Math.floor(Math.random() * 1000000 + 10000),
            nro_mpf: Math.floor(Math.random() * 1000000 + 10000),
          })
          .then((res) => {
            acta = res.data;
          });
      } catch (err) {
        console.log(err);
      }

      for (let i = 0; i < 2; i++) {
        let bolsa;
        try {
          await axios
            .post(Variables.baseEndpoint + `/addBolsa/${acta.id}`, {
              nro_precinto: Math.floor(Math.random() * 100000 + 10000),
              color_precinto: "rojo",
              notas: "Una nota sobre la bolsa",
            })
            .then((res) => {
              bolsa = res.data;
            });
        } catch (err) {
          console.log(err);
        }

        for (let i = 0; i < 6; i++) {
          let efecto;
          try {
            await axios
              .post(Variables.baseEndpoint + `/addEfecto/${bolsa.id}`, {
                tipo: "tablet",
                color: "negro",
                tipo_extraccion: "fisica",
                nro_serie: Math.floor(Math.random() * 100000000 + 10000),
                tipo_desbloqueo: "patron",
                notas: "pantalla rota",
                IMEI: Math.floor(Math.random() * 100000000000 + 10000),
                modelo: "A7",
                marca: "samsung",
                sofware: "UFED121",
              })
              .then((res) => {
                efecto = res.data;
              });
          } catch (err) {
            console.log(err);
          }

          for (let i = 0; i < 2; i++) {
            try {
              await axios.post(Variables.baseEndpoint + `/addAlmacenamiento/${efecto.id}`, {
                marca: "samsung",
                modelo: "HD5581S",
                capacidad: "500 GB",
                tipo_extraccion: "fisica",
                tipo_almacenamiento: "ssd",
                nro_serie: Math.floor(Math.random() * 100000000 + 10000),
              });
            } catch (err) {
              console.log(err);
            }
          }

          for (let i = 0; i < 2; i++) {
            try {
              await axios.post(Variables.baseEndpoint + `/addSim/${efecto.id}`, {
                nro_serie: Math.floor(Math.random() * 100000000 + 10000),
                nro_linea: Math.floor(Math.random() * 100000000 + 10000),
                tipo_extraccion: "fisica",
                empresa: "movistar",
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }

      for (let i = 0; i < 3; i++) {
        try {
          await axios.post(Variables.baseEndpoint + `/addIntegrante/${acta.id}`, {
            nombre: "Ramiro",
            dni: 42809069,
            cargo_o_profesion: "programador",
            matricula: Math.floor(Math.random() * 1000000 + 10000),
            domicilio: "malabia 2231",
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
