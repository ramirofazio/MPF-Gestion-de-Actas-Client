import {
  GET_ACTAS,
  GET_EFECTOS,
  GET_ACTAS_EN_PROCESO,
  GET_ACTAS_EN_PROCESO_FILTERED,
  GET_EFECTOS_FROM_ACTA,
  GET_EFECTOS_EN_PROCESO_FILTERED,
} from "./actions";

let initialState = {
  allActas: [],
  actasEnProceso: [],
  allEfectos: [],
  efectosEnProceso: [],
  efectosFromActa: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTAS:
      return {
        ...state,
        allActas: action.payload,
      };
    case GET_EFECTOS:
      // eslint-disable-next-line
      const efectosEnProceso = action.payload.filter((efecto) => efecto.estado === "en proceso");
      return {
        ...state,
        allEfectos: action.payload,
        efectosEnProceso: efectosEnProceso,
      };
    case GET_ACTAS_EN_PROCESO:
      return {
        ...state,
        actasEnProceso: action.payload,
      };
    case GET_ACTAS_EN_PROCESO_FILTERED:
      return {
        ...state,
        actasEnProceso: action.payload,
      };
    case GET_EFECTOS_FROM_ACTA:
      return {
        ...state,
        efectosFromActa: action.payload,
      };
    case GET_EFECTOS_EN_PROCESO_FILTERED:
      return {
        ...state,
        efectosFromActa: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
