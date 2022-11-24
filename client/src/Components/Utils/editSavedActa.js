import axios from "axios";
import Variables from "../../Styles/Variables";

const editSavedActa = async (actaId) => {
  try {
    const res = await axios.get(Variables.baseEndpoint + `/getActas/${actaId}`);
    if (res) {
      if (res.data.nro_mpf) {
        //* Seteamos la flag
        localStorage.setItem("actaFlag", "MPF/DEN");
      } else {
        localStorage.setItem("actaFlag", "COOP");
      }

      localStorage.setItem("currentActa", JSON.stringify(res.data));
      localStorage.setItem("integrantes", JSON.stringify(res.data.Integrantes));
      localStorage.setItem("currentBolsas", JSON.stringify(res.data.Bolsas));

      window.location.assign("/actas/crear/1");
    }
  } catch (err) {
    console.log(err);
  }
};

export default editSavedActa;
