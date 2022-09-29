import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import Fallback from "./Components/Fallback";
import NavBar from "./Components/Navbar";
const Inicio = lazy(() => import("./Components/Inicio"));
const Actas = lazy(() => import("./Components/Actas/Actas"));
const AddActa = lazy(() => import("./Components/Actas/pages/AddActa"));
const ModifyActa = lazy(() => import("./Components/Actas/pages/ModifyActa"));
const SeeEfectos = lazy(() => import("./Components/Actas/pages/SeeEfectos"));

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
          //* Router Actas
          <Route path="/actas" exact element={<Actas />} />
          <Route path="/actas/crear" exact element={<AddActa />} />
          <Route path="/actas/efectos" exact element={<SeeEfectos />} />
          <Route path="/actas/modificar" exact element={<ModifyActa />} />
          //* Router Consultas
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
