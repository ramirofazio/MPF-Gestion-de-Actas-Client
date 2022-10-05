import axios from "axios";
import Variables from "../Styles/Variables";

export const GET_ACTAS = "GET_ACTAS";
export const GET_EFECTOS = "GET_EFECTOS";
export const GET_ACTAS_EN_PROCESO = "GET_ACTAS_EN_PROCESO";
export const GET_ACTAS_EN_PROCESO_FILTERED = "GET_ACTAS_EN_PROCESO_FILTERED";
export const GET_EFECTOS_FROM_ACTA = "GET_EFECTOS_FROM_ACTA";

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
    const { nroMpf, nroCij, nroDil } = filtros;
    axios
      .get(
        Variables.baseEndpoint +
          `/getActas?enProceso=true&mpf=${nroMpf}&cij=${nroCij}&dil=${nroDil}`
      )
      .then((res) => {
        return dispatch({
          type: GET_ACTAS_EN_PROCESO_FILTERED,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function sendEfectosIdsAndActaId({ actaId, efectosIds }) {
  axios
    .post(Variables.baseEndpoint + "/updateEfecto", { actaId, efectosIds })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return function (dispatch) {};
}

export async function loadDB() {
  for (let i = 0; i < 5; i++) {
    let acta;
    await axios
      .post(Variables.baseEndpoint + "/addActa", {
        nro_cij: 500500,
        nro_dil: 22621,
        nro_mpf: 7912313,
      })
      .then((res) => {
        acta = res.data;
      });

    for (let i = 0; i < 2; i++) {
      let bolsa;
      await axios
        .post(Variables.baseEndpoint + `/addBolsa/${acta.id}`, {
          nro_precinto: 123456,
          color_precinto: "rojo",
          notas: "Una nota sobre la bolsa",
        })
        .then((res) => {
          bolsa = res.data;
        });

      for (let i = 0; i < 3; i++) {
        let efecto;
        await axios
          .post(Variables.baseEndpoint + `/addEfecto/${bolsa.id}`, {
            nro_precinto: 123456,
            color_precinto: "rojo",
            tipo: "tablet",
            color: "negro",
            tipo_extraccion: "fisica",
            nro_serie: 5778853694,
            tipo_desbloqueo: "patron",
            notas: "pantalla rota",
            IMEI: 16148488777556222,
            modelo: "A7",
            marca: "samsung",
            sofware: "UFED121",
          })
          .then((res) => {
            efecto = res.data;
          });

        for (let i = 0; i < 2; i++) {
          await axios.post(Variables.baseEndpoint + `/addAlmacenamiento/${efecto.id}`, {
            marca: "samsung",
            modelo: "HD5581S",
            capacidad: "500 GB",
            tipo_extraccion: "fisica",
            tipo_almacenamiento: "ssd",
            nro_serie: "581302255",
          });
        }

        for (let i = 0; i < 2; i++) {
          await axios.post(Variables.baseEndpoint + `/addSim/${efecto.id}`, {
            nro_serie: 123456789,
            nro_linea: 1000000000,
            tipo_extraccion: "fisica",
            empresa: "movistar",
          });
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      await axios.post(Variables.baseEndpoint + `/addIntegrante/${acta.id}`, {
        nombre: "Ramiro",
        dni: 42809069,
        cargo_o_profesion: "programador",
        matricula: 168413513,
        domicilio: "malabia 2231",
      });
    }
  }
}
