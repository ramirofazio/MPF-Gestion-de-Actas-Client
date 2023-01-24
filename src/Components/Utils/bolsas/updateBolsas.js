import axios from "axios";
import Variables from "../../../Styles/Variables";

const updateBolsas = async () => {
  try {
    const actaId = JSON.parse(localStorage.getItem("currentActa")).id;
    localStorage.setItem("currentBolsas", []);
    const res = await axios.get(Variables.baseEndpoint + `/getActas/${actaId}`);
    if (res) {
      const acta = res.data;
      localStorage.setItem("currentBolsas", JSON.stringify(acta.Bolsas));
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateBolsas;
