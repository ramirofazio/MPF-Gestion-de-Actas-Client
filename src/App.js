import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const adminState = useSelector((s) => s.admin);

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
          <Route path="/actas/crear/2" exact element={<AddPeritos />} />
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

export default App;
