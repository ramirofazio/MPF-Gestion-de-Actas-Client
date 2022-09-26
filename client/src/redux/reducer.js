import { GET_ACTAS } from "./actions";

let initialState = {
  allActas: [],
  acta: [],
  bolsa: [],
  efecto: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTAS:
      console.log("actas cargadas");
      return {
        ...state,
        allActas: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
