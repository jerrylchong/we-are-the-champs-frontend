import { Button, Heading } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import Loader from "../common/Loader";
import ClearDataModal from "./components/ClearDataModal";
import Empty from "./components/Empty";
import StandingsTable from "./components/StandingsTable";
import "./Homepage.css";
import useStandingsData from "./hooks/useStandingsData";

const Homepage = () => {
  const { data: standingsData, isLoading } = useStandingsData();
  const standings = useMemo(() => standingsData || [], [standingsData]);

  const [isClearDataOpen, setClearDataOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="Homepage">
      {standings.length > 0 ? (
        <>
          <span className="Homepage-clear-btn-row">
            <Button colorScheme="red" onClick={() => setClearDataOpen(true)}>
              Clear data
            </Button>
          </span>
          <div className="Homepage-group-standings">
            {standings.map((g) => (
              <div>
                <Heading size="md" sx={{ marginBottom: "1rem" }}>
                  Group {g.number}
                </Heading>
                <StandingsTable teams={g.teams} />
              </div>
            ))}
          </div>
          <ClearDataModal isOpen={isClearDataOpen} setOpen={setClearDataOpen} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Homepage;
