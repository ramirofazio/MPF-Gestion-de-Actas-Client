import { toast } from "react-toastify";
import {
  GET_ACTAS,
  GET_EFECTOS,
  GET_ACTAS_EN_PROCESO,
  GET_ACTAS_EN_PROCESO_FILTERED,
  GET_EFECTOS_FROM_ACTA,
  GET_EFECTOS_EN_PROCESO_FILTERED,
  GET_ACTAS_FILTERED,
  CREATE_ACTA,
  CREATE_INTEGRANTES,
  CREATE_BOLSAS,
  CREATE_EFECTOS,
} from "./actions";

let initialState = {
  allActas: [],
  allActasSave: [],
  currentActa: [],
  currentIntegrantes: [],
  currentBolsas: JSON.parse(localStorage.getItem("currentBolsas")) || [],
  currentEfectos: [],
  actasEnProceso: [],
  actasEnProcesoSave: [],
  allEfectos: [],
  efectosEnProceso: [],
  efectosFromActa: [],
  efectosFromActasSave: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EFECTOS:
      return {
        ...state,
        currentEfectos: [...state.currentEfectos, action.payload],
      };
    case CREATE_BOLSAS:
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
    case CREATE_INTEGRANTES:
      return {
        ...state,
        currentIntegrantes: action.payload,
      };
    case CREATE_ACTA:
      return {
        ...state,
        currentActa: action.payload,
      };
    case GET_ACTAS:
      return {
        ...state,
        allActas: action.payload,
        allActasSave: action.payload,
      };
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
        actasEnProcesoSave: action.payload,
      };
    case GET_ACTAS_EN_PROCESO_FILTERED: {
      const { mpf, cij, dil } = action.payload;

      let actasFiltradas;
      if (!mpf && !cij && !dil) {
        //* Si no mandan nada devuelvo todas actas en proceso
        actasFiltradas = state.actasEnProcesoSave;
      } else if (mpf && cij && dil) {
        //* Si tiene todos
        actasFiltradas = state.actasEnProceso.filter(
          (acta) =>
            String(acta.nro_mpf).match(Number(mpf)) &&
            String(acta.nro_cij).match(Number(cij)) &&
            String(acta.nro_dil).match(Number(dil))
        );
      } else if (mpf && cij && !dil) {
        //* Si tiene mpf y cij
        actasFiltradas = state.actasEnProceso.filter(
          (acta) => String(acta.nro_mpf).match(Number(mpf)) && String(acta.nro_cij).match(Number(cij))
        );
      } else if (mpf && !cij && dil) {
        //*si tiene mpf y dil
        actasFiltradas = state.actasEnProceso.filter(
          (acta) => String(acta.nro_mpf).match(Number(mpf)) && String(acta.nro_dil).match(Number(dil))
        );
      } else if (!mpf && cij && dil) {
        //* si tiene cij y dil
        actasFiltradas = state.actasEnProceso.filter(
          (acta) => String(acta.nro_cij).match(Number(cij)) && String(acta.nro_dil).match(Number(dil))
        );
      } else if (mpf && !cij && !dil) {
        //* si tiene solo mpf
        actasFiltradas = state.actasEnProceso.filter((acta) => String(acta.nro_mpf).match(mpf));
      } else if (!mpf && cij && !dil) {
        //* si tiene solo cij
        actasFiltradas = state.actasEnProceso.filter((acta) => String(acta.nro_cij).match(Number(cij)));
      } else if (!mpf && !cij && dil) {
        //*si tiene solo dil
        actasFiltradas = state.actasEnProceso.filter((acta) => String(acta.nro_dil).match(Number(dil)));
      }

      if (mpf || cij || dil) {
        if (actasFiltradas.length === 0) {
          actasFiltradas = state.actasEnProcesoSave;
          toast.warning("Acta no encontrada");
        }
      }

      return {
        ...state,
        actasEnProceso: actasFiltradas,
      };
    }
    case GET_EFECTOS_FROM_ACTA:
      return {
        ...state,
        efectosFromActa: action.payload,
        efectosFromActaSave: action.payload,
      };
    case GET_EFECTOS_EN_PROCESO_FILTERED: {
      const { nroPrecinto, marca, estado } = action.payload;

      let efectosFiltrados;
      if (!nroPrecinto && !marca && !estado) {
        //* Ninguno
        efectosFiltrados = state.efectosFromActaSave;
      } else if (nroPrecinto && marca && estado) {
        //* Todos
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          if (estado === "en proceso") {
            return (
              ef.estado === "en proceso" && ef.marca.match(marca) && String(ef.Bolsa.nro_precinto).match(nroPrecinto)
            );
          } else {
            return (
              ef.estado === "completo" && ef.marca.match(marca) && String(ef.Bolsa.nro_precinto).match(nroPrecinto)
            );
          }
        });
      } else if (nroPrecinto && marca && !estado) {
        //* Sin estado
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return String(ef.Bolsa.nro_precinto).match(nroPrecinto) && ef.marca.match(marca);
        });
      } else if (nroPrecinto && !marca && !estado) {
        //* Sin estado ni marca
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return String(ef.Bolsa.nro_precinto).match(nroPrecinto);
        });
      } else if (!nroPrecinto && marca && !estado) {
        //* Solo marca
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return ef.marca.match(marca);
        });
      } else if (!nroPrecinto && !marca && estado) {
        //* Solo estado
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            return ef.estado === "en proceso";
          } else {
            return ef.estado === "completo";
          }
        });
      } else if (!nroPrecinto && marca && estado) {
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            return ef.estado === "en proceso" && ef.marca.match(marca);
          } else {
            return ef.estado === "completo" && ef.marca.match(marca);
          }
        });
      } else if (nroPrecinto && !marca && estado) {
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            return ef.estado === "en proceso" && String(ef.Bolsa.nro_precinto).match(nroPrecinto);
          } else {
            return ef.estado === "completo" && String(ef.Bolsa.nro_precinto).match(nroPrecinto);
          }
        });
      }

      if (efectosFiltrados?.length === 0) {
        toast.warning("Efecto no encontrado");
      }

      return {
        ...state,
        efectosFromActa: efectosFiltrados,
      };
    }

    default:
      return state;
  }
}

export default reducer;
