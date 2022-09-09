import React from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { ReactComponent as NoData } from "../../assets/no-data.svg";
import "./Empty.css";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const navigate = useNavigate();

  return (
    <div className="Home-empty">
      <NoData
        width="auto"
        height="40vh"
        opacity={0.5}
        filter="grayscale(100%)"
      />
      <Text>No teams have been added yet</Text>
      <Button
        className="Home-empty-btn"
        colorScheme="teal"
        onClick={() => navigate("/add")}
      >
        Add teams
      </Button>
    </div>
  );
};

export default Empty;
