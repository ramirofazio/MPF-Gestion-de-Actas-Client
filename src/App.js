import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { getUsers, setCurrentUser, admin } from "./redux/actions";
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

  if (!flag) {
    return (
      <Container>
        <Logo src={logo2} />
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Usuario</Label>
            <Select onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username}>
              <SelectOpt>Usuario</SelectOpt>
              {users &&
                users.map((u) => (
                  <SelectOpt value={u.username} key={u.legajo}>
                    {u.username}
                  </SelectOpt>
                ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={user.password}
              placeholder="Contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </InputContainer>
        </Form>
      </Container>
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  ${inputContainer}
`;

const Label = styled.label`
  ${inputLabel}
  color: white
`;

const Select = styled.select`
  ${select}
  margin-bottom: 20px;
`;

const SelectOpt = styled.option`
  font-size: medium;
  font-weight: 400;
  color: ${secondaryColor};
`;

const Form = styled.form`
  ${form}
  background-color: ${principalColor};
  height: 50%;
  width: 50%;
  border-radius: 10px;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${principalColor};
  font-size: medium;
  font-weight: 400;
  color: ${secondaryColor};

  &:focus {
    border: 1px solid ${principalColor};
    outline: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
  width: 100%;
`;

const Logo = styled.img`
  position: absolute;
  top: 0;
  margin-top: 4%;
`;
