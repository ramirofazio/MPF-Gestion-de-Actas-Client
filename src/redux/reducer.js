import { toast } from "react-toastify";
import {
  GET_ACTAS,
  GET_ACTAS_FILTERED,
  CREATE_ACTA,
  CREATE_INTEGRANTES,
  CREATE_BOLSAS,
  CREATE_EFECTOS,
  GET_BUGS_REPORTS,
  CLEAR_STATES,
  ADMIN,
} from "./actions";

let initialState = {
  admin: false,
  allActas: [],
  allActasSave: [],
  currentActa: JSON.parse(localStorage.getItem("currentActa")) || [],
  currentIntegrantes: JSON.parse(localStorage.getItem("integrantes")) || [],
  currentBolsas: JSON.parse(localStorage.getItem("currentBolsas")) || [],
  currentEfectos: [] || JSON.parse(localStorage.getItem("currentEfectos")),
  bugsReports: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN: {
      return {
        ...state,
        admin: !state.admin,
      };
    }
    case CLEAR_STATES: {
      return {
        allActas: [],
        allActasSave: [],
        currentActa: [],
        currentIntegrantes: [],
        currentBolsas: [],
        currentEfectos: [],
        bugsReports: [],
      };
    }
    case GET_BUGS_REPORTS: {
      return {
        ...state,
        bugsReports: action.payload,
      };
    }
    case CREATE_EFECTOS: {
      const localEfectos = JSON.parse(localStorage.getItem("currentEfectos"));
      return {
        ...state,
        currentEfectos: localEfectos,
      };
    }

    case CREATE_BOLSAS: {
      //eslint-disable-next-line
      const localBolsas = JSON.parse(localStorage.getItem("currentBolsas"));
      if (localBolsas) {
        localStorage.setItem("currentBolsas", JSON.stringify([...localBolsas, action.payload]));
      } else {
        localStorage.setItem("currentBolsas", JSON.stringify([action.payload]));
      }
      return {
        ...state,
        currentBolsas: [...state.currentBolsas, action.payload],
      };
    }

    case CREATE_INTEGRANTES: {
      return {
        ...state,
        currentIntegrantes: action.payload,
      };
    }

    case CREATE_ACTA: {
      localStorage.setItem("currentActa", JSON.stringify(action.payload));
      return {
        ...state,
        currentActa: action.payload,
      };
    }

    case GET_ACTAS: {
      return {
        ...state,
        allActas: action.payload,
        allActasSave: action.payload,
      };
    }

    case GET_ACTAS_FILTERED: {
      const { mpf, cij, dil, estado } = action.payload;

      let actasFiltered;
      if (!mpf && !cij && !dil && !estado) {
        //* Ninguno
        actasFiltered = state.allActasSave;
      } else if (mpf && cij && dil && estado) {
        //* Todos
        actasFiltered = state.allActasSave.filter((acta) => {
          return (
            acta.estado === estado &&
            String(acta.nro_mpf).match(mpf) &&
            String(acta.nro_cij).match(cij) &&
            String(acta.nro_dil).match(dil)
          );
        });
      } else if (mpf && cij && dil && !estado) {
        //* Sin estado
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_cij).match(cij) && String(acta.nro_dil).match(dil);
        });
      } else if (mpf && cij && !dil && !estado) {
        //* Sin estado ni dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_cij).match(cij);
        });
      } else if (mpf && !cij && !dil && !estado) {
        //* Solo mpf
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf);
        });
      } else if (!mpf && cij && !dil && !estado) {
        //* Solo cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_cij).match(cij);
        });
      } else if (!mpf && !cij && dil && !estado) {
        //* Solo dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_dil).match(dil);
        });
      } else if (!mpf && !cij && !dil && estado) {
        //* Solo estado
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado;
        });
      } else if (!mpf && !cij && dil && estado) {
        //* Solo estado y dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_dil).match(dil);
        });
      } else if (!mpf && cij && !dil && estado) {
        //* Solo estado y cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_cij).match(cij);
        });
      } else if (mpf && !cij && !dil && estado) {
        //* Solo estado y mpf
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_mpf).match(mpf);
        });
      } else if (!mpf && cij && dil && !estado) {
        //* Solo dil y cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_cij).match(cij) && String(acta.nro_dil).match(dil);
        });
      } else if (mpf && !cij && dil && !estado) {
        //* Solo mpf y dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_dil).match(dil);
        });
      }

      if (mpf || cij || dil || estado) {
        if (actasFiltered?.length === 0) {
          actasFiltered = state.allActasSave;
          toast.warning("Acta no encontrada");
        }
      }

      return {
        ...state,
        allActas: actasFiltered,
      };
    }

    default:
      return state;
  }
}

export default reducer;
