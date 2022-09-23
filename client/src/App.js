import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Fallback from "./Components/Fallback";
const Home = lazy(() => import("./Components/Home"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
