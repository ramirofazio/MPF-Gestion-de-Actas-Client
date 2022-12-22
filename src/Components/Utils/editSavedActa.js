import axios from "axios";
import Variables from "../../Styles/Variables";

const editSavedActa = async (actaId, navigate) => {
  try {
    const res = await axios.get(Variables.baseEndpoint + `/getActas/${actaId}`);
    if (res) {
      if (res.data.nro_mpf) {
        localStorage.setItem("actaFlag", "MPF/DEN");
      } else {
        localStorage.setItem("actaFlag", "COOP");
      }

      localStorage.setItem("currentActa", JSON.stringify(res.data));
      localStorage.setItem("integrantes", JSON.stringify(res.data.Integrantes));
      localStorage.setItem("peritos", JSON.stringify(res.data.Peritos));
      localStorage.setItem("currentBolsas", JSON.stringify(res.data.Bolsas));
      if (res.data.Bolsas) {
        res.data.Bolsas.map((bolsa) => {
          bolsa.Efectos.map((efecto) => {
            let localEfectos = JSON.parse(localStorage.getItem("currentEfectos"));
            if (localEfectos) {
              localStorage.setItem("currentEfectos", JSON.stringify([localEfectos, efecto]));
            } else {
              localStorage.setItem("currentEfectos", JSON.stringify([efecto]));
            }
          });
        });
      }

      navigate("/actas/crear/1");
    }
  } catch (err) {
    console.log(err);
  }
};

export default editSavedActa;
