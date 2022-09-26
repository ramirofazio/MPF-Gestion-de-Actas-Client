import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Fallback from "./Components/Fallback";
import NavBar from "./Components/Navbar";
const Inicio = lazy(() => import("./Components/Inicio"));
const CrearActa = lazy(() => import("./Components/CrearActa"));
const Consultas = lazy(() => import("./Components/Consultas"));

function App() {
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
