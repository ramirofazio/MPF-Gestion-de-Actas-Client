import axios from "axios";
import Variables from "../../../Styles/Variables";
import generateDoc from "./generateDoc";

const getSavedActa = async (actaId, navigate) => {
  try {
    const res = await axios.get(Variables.baseEndpoint + `/getActas/${actaId}`);
    if (res) {
      localStorage.setItem("finalActa", JSON.stringify(res.data));
      if (res.data.nro_mpf) {
        localStorage.setItem("actaFlag", "MPF/DEN");
      } else {
        localStorage.setItem("actaFlag", "COOP");
      }
      generateDoc();
      if (navigate) {
        navigate("/");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default getSavedActa;
