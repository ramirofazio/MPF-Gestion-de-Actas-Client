import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllActas } from "./redux/actions";

//Components
import Fallback from "./Components/Fallback";
import NavBar from "./Components/Navbar";
const Inicio = lazy(() => import("./Components/Inicio"));
const CrearActa = lazy(() => import("./Components/CrearActa/CrearActa"));
const Consultas = lazy(() => import("./Components/Consultas/Consultas"));

function App() {
  const dispatch = useDispatch();

  const actas = useSelector((state) => state?.allActas);

  useEffect(() => {
    dispatch(getAllActas());
  }, []);
  console.log(actas);

  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/crearActa" exact element={<CrearActa />} />
          <Route path="/consultas" exact element={<Consultas />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
