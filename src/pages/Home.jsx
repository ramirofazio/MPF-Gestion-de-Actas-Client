import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, clearStates, admin } from "redux/actions";
import { ActasCards, Header } from "components/index";
import { saveInStorage, getOfStorage } from "utils";

export function Home() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas);
  const adminState = useSelector((s) => getOfStorage("admin") || s.admin);

  useEffect(() => {
    const currentUser = getOfStorage("currentUser");
    const users = getOfStorage("users");
    if (currentUser) {
      localStorage.clear();
      dispatch(clearStates());
      dispatch(getAllActas());
      if (adminState) {
        dispatch(admin());
      }
      saveInStorage("currentUser", currentUser);
      saveInStorage("users", users);
    }
  }, []);

  return (
    <main className="paddingLeftContainer">
      <Header title={"Creación de Actas"} />
      <ActasCards allActas={allActas} typeOfActa={"home"} />
    </main>
  );
}
