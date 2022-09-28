import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import Fallback from "./Components/Fallback";
import NavBar from "./Components/Navbar";
const Inicio = lazy(() => import("./Components/Inicio"));
const CrearActa = lazy(() => import("./Components/CrearActa/CrearActa"));
const Consultas = lazy(() => import("./Components/Consultas/Consultas"));
const Todas = lazy(() => import("./Components/Consultas/pages/Todas"));
const NumeroMpf = lazy(() => import("./Components/Consultas/pages/NumeroMpf"));
const NumeroCij = lazy(() => import("./Components/Consultas/pages/NumeroCij"));
const Fecha = lazy(() => import("./Components/Consultas/pages/Fecha"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/crearActa" exact element={<CrearActa />} />
          <Route path="/consultas" exact element={<Consultas />} />
          <Route path="/consultas/todas" exact element={<Todas />} />
          <Route path="/consultas/nro_mpf" exact element={<NumeroMpf />} />
          <Route path="/consultas/nro_cij" exact element={<NumeroCij />} />
          <Route path="/consultas/fecha" exact element={<Fecha />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
