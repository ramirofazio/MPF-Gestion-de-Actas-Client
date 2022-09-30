import { GET_ACTAS, GET_EFECTOS } from "./actions";

let initialState = {
  allActas: [],
  allEfectos: [],
  efectosEnProceso: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTAS:
      return {
        ...state,
        allActas: action.payload,
      };
    case GET_EFECTOS:
      const efectosEnProceso = action.payload.filter((efecto) => efecto.estado === "en proceso");
      return {
        ...state,
        allEfectos: action.payload,
        efectosEnProceso: efectosEnProceso,
      };
    default:
      return state;
  }
}

export default reducer;
