import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//* Components
import Fallback from "./Components/Fallback";
import NavBar from "./Components/Navbar";
const Actas = lazy(() => import("./Components/Actas/Actas"));
const AddActa = lazy(() => import("./Components/Actas/pages/AddActa"));
const ModifyActa = lazy(() => import("./Components/Actas/pages/ModifyActa"));
const EfectosEnProceso = lazy(() => import("./Components/Actas/pages/ActasEnProceso/EfectosEnProceso"));
const ActasEnProceso = lazy(() => import("./Components/Actas/pages/ActasEnProceso/ActasEnProceso"));
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
          {/*Router Actas*/}
          <Route path="/" exact element={<Actas />} />
          <Route path="/actas/crear" exact element={<AddActa />} />
          <Route path="/actas/en_proceso" exact element={<ActasEnProceso />} />
          <Route path="/efectos/en_proceso/:id" exact element={<EfectosEnProceso />} />
          <Route path="/actas/modificar" exact element={<ModifyActa />} />
          {/*Router Consultas*/}
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
