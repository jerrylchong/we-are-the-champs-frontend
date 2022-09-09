import React from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { ReactComponent as NoData } from "../../assets/no-data.svg";
import "./Empty.css";

const Empty = () => {
  return (
    <div className="Home-empty">
      <NoData
        width="auto"
        height="40vh"
        opacity={0.5}
        filter="grayscale(100%)"
      />
      <Text>No teams were found</Text>
      <Button className="Home-empty-btn">Add teams</Button>
    </div>
  );
};

export default Empty;
