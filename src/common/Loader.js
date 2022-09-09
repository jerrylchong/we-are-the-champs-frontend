import React from "react";
import { Spinner } from "@chakra-ui/react";

import "./Loader.css";

const Loader = () => {
  return (
    <div className="Loader-container">
      <Spinner />
    </div>
  );
};

export default Loader;
