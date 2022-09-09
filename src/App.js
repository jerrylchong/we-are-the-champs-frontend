import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Loader from "./common/Loader";

const Homepage = React.lazy(() => import("./home/Homepage"));
const DataInputPage = React.lazy(() => import("./dataInput/DataInput"));

function App() {
  return (
    <div className="App">
      <header className="App-header">We are the champions</header>
      <div className="App-content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/add" element={<DataInputPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
