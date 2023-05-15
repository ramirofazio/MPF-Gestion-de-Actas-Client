import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { getUsers, setCurrentUser, admin, createUsers } from "./redux/actions";
//* Components
import Fallback from "./Components/Utils/Fallback";
import NavBar from "./Components/Utils/navBar/NavBar";
import NotFound from "./Components/Utils/NotFound";
//* AddActas
const Home = lazy(() => import("./Components/Actas/Home"));
const AddActa = lazy(() => import("./Components/Actas/Pages/AddActa"));
const AddIntegrantes = lazy(() => import("./Components/Actas/Pages/AddIntegrantes"));
const AddPeritos = lazy(() => import("./Components/Actas/Pages/AddPeritos"));
const AddBolsas = lazy(() => import("./Components/Actas/Pages/AddBolsas"));
//* Admin
const AdmHome = lazy(() => import("./Components/Admin/Home"));
const BugsReports = lazy(() => import("./Components/Admin/pages/BugsReports"));
const Stats = lazy(() => import("./Components/Admin/pages/Stats"));
const ActaRemove = lazy(() => import("./Components/Admin/pages/ActaRemove"));
//* Styles
import styled from "styled-components";
import Variables from "./Styles/Variables";
import GlobalStyles from "./Styles/GlobalStyles";
//* Utils
import { toast } from "react-toastify";
import logo2 from "./Assets/logo2.png";
//* Initializations
const { principalColor, secondaryColor } = Variables;
const { select, form, inputLabel, inputContainer } = GlobalStyles;

function App() {
  const dispatch = useDispatch();

  const adminState = useSelector((s) => JSON.parse(localStorage.getItem("admin")) || s.admin);
  const users = useSelector((s) => JSON.parse(localStorage.getItem("users")) || s.users);
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);

  const [flag, setFlag] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFlag(true);
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  React.useEffect(() => {
    setUser("");
  }, [flag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = users.find((u) => u.username === user.username);
    if (currentUser.password === user.password) {
      if (user.username === "admin") {
        dispatch(admin());
      }
      toast.success("¡Usuario autenticado con exito!");
      dispatch(setCurrentUser(currentUser));
      setFlag(true);
    } else {
      toast.error("¡Contraseña incorrecta!");
      setUser({ ...user, password: "" });
    }
  };

  const handleCreateUsers = () => {
    const res = prompt("s/n");
    if (res === "s") {
      dispatch(createUsers());
    }
  };

  if (!flag) {
    return (
      <div className="flexContainer100x100">
        <img className="absolute top-0 mt-10" src={logo2} onDoubleClick={() => handleCreateUsers()} />
        <form className="basicForm50x50" onSubmit={handleSubmit}>
          <div className="mb-5 flex h-[15%] w-[40%] flex-col items-center justify-center ">
            <label className="mb-1 self-start text-white">Usuario</label>
            <select className="select" onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username}>
              <option>Usuario</option>
              {users &&
                users.map((u) => (
                  <option value={u.username} key={u.legajo}>
                    {u.username}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex h-[15%] w-[40%] flex-col items-center justify-center">
            <label className="mb-1 self-start text-white">Contraseña</label>
            <input
              className="h-full w-full rounded-md border-principal text-center focus:border-principal focus:outline-none"
              type="password"
              value={user.password}
              placeholder="Contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <Router>
        <Suspense fallback={<Fallback />}>
          <NavBar setFlag={setFlag} />
          <Routes>
            {/*Router Error*/}
            <Route path="*" element={<NotFound />} />
            {/*Router Actas*/}
            <Route path="/" exact element={<Home />} />
            <Route path="/actas/crear/1" exact element={<AddActa />} />
            {currentUser.username === "admin" && <Route path="/actas/crear/2" exact element={<AddPeritos />} />}
            <Route path="/actas/crear/3" exact element={<AddIntegrantes />} />
            <Route path="/actas/crear/4" exact element={<AddBolsas />} />
            {/*Admin*/}
            {adminState === true && (
              <>
                <Route path="/admin" element={<AdmHome />} />
                <Route path="/admin/bugs" element={<BugsReports />} />
                <Route path="/admin/estadisticas" element={<Stats />} />
                <Route path="/admin/eliminarActa" element={<ActaRemove />} />
              </>
            )}
          </Routes>
        </Suspense>
      </Router>
    );
  }
}

export default App;
