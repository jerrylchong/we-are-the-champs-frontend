import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

const Homepage = React.lazy(() => import("./home/Homepage"));

function App() {
  return (
    <div className="App">
      <header className="App-header">We are the champions</header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
