import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//* Components
import Fallback from "./Components/Utils/Fallback";
import NavBar from "./Components/Utils/Navbar";
import NotFound from "./Components/Utils/NotFound";
//* AddActas
const Home = lazy(() => import("./Components/Actas/Home"));
const AddActa = lazy(() => import("./Components/Actas/Pages/AddActa"));
const AddIntegrantes = lazy(() => import("./Components/Actas/Pages/AddIntegrantes"));
const AddBolsas = lazy(() => import("./Components/Actas/Pages/AddBolsas"));
//* Consultas
const Consultas = lazy(() => import("./Components/Consultas/Consultas"));
const Todas = lazy(() => import("./Components/Consultas/pages/Todas"));
//* Admin
const AdmHome = lazy(() => import("./Components/Admin/Home"));
const BugsReports = lazy(() => import("./Components/Admin/pages/BugsReports"));
const Stats = lazy(() => import("./Components/Admin/pages/Stats"));
const ActaRemove = lazy(() => import("./Components/Admin/pages/ActaRemove"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <NavBar />
        <Routes>
          {/*Router Error*/}
          <Route path="*" element={<NotFound />} />
          {/*Router Actas*/}
          <Route path="/" exact element={<Home />} />
          <Route path="/actas/crear/1" exact element={<AddActa />} />
          <Route path="/actas/crear/2" exact element={<AddIntegrantes />} />
          <Route path="/actas/crear/3" exact element={<AddBolsas />} />
          {/*Router Consultas*/}
          <Route path="/consultas" exact element={<Consultas />} />
          <Route path="/consultas/todas" exact element={<Todas />} />
          {/*Admin*/}
          {localStorage.getItem("admin") === "true" && (
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

export default App;
