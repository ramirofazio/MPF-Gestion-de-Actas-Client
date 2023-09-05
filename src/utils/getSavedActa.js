import axios from "axios";
import { serverUrl, generateDoc } from "./index";

export async function getSavedActa(actaId, navigate) {
  try {
    const res = await axios.get(serverUrl + `/getActas/${actaId}`);
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
}
