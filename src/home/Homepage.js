import { Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import ClearDataModal from "./components/ClearDataModal";
import Empty from "./components/Empty";
import StandingsTable from "./components/StandingsTable";
import "./Homepage.css";

const Homepage = () => {
  const records = [
    {
      _id: "631ae4fc9a860a5ab7d826b0",
      number: 1,
      teams: [
        {
          _id: "631ae4fc9a860a5ab7d826b4",
          name: "Test 1",
          registrationDate: "2021-12-31T16:00:00.000Z",
          groupNo: 1,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 6,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fd9a860a5ab7d826bc",
          name: "Test 3",
          registrationDate: "2022-02-28T16:00:00.000Z",
          groupNo: 1,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 4,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fd9a860a5ab7d826c4",
          name: "Test 5",
          registrationDate: "2022-04-30T16:00:00.000Z",
          groupNo: 1,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 4,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fc9a860a5ab7d826b8",
          name: "Test 2",
          registrationDate: "2022-01-31T16:00:00.000Z",
          groupNo: 1,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 4,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
        {
          _id: "631ae4fd9a860a5ab7d826c0",
          name: "Test 4",
          registrationDate: "2022-03-31T16:00:00.000Z",
          groupNo: 1,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 3,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
        {
          _id: "631ae4fd9a860a5ab7d826c8",
          name: "Test 6",
          registrationDate: "2022-05-31T16:00:00.000Z",
          groupNo: 1,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 2,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
      ],
      __v: 36,
    },
    {
      _id: "631ae4fc9a860a5ab7d826b2",
      number: 2,
      teams: [
        {
          _id: "631ae4fe9a860a5ab7d826d0",
          name: "Test 8",
          registrationDate: "2022-07-31T16:00:00.000Z",
          groupNo: 2,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 5,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fe9a860a5ab7d826d8",
          name: "Test 10",
          registrationDate: "2022-09-30T16:00:00.000Z",
          groupNo: 2,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 4,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fe9a860a5ab7d826e0",
          name: "Test 12",
          registrationDate: "2022-11-30T16:00:00.000Z",
          groupNo: 2,
          wins: 3,
          losses: 2,
          draws: 0,
          goals: 3,
          points: 9,
          alternatePoints: 17,
          __v: 0,
        },
        {
          _id: "631ae4fd9a860a5ab7d826cc",
          name: "Test 7",
          registrationDate: "2022-06-30T16:00:00.000Z",
          groupNo: 2,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 4,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
        {
          _id: "631ae4fe9a860a5ab7d826d4",
          name: "Test 9",
          registrationDate: "2022-08-31T16:00:00.000Z",
          groupNo: 2,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 4,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
        {
          _id: "631ae4fe9a860a5ab7d826dc",
          name: "Test 11",
          registrationDate: "2022-10-31T16:00:00.000Z",
          groupNo: 2,
          wins: 2,
          losses: 3,
          draws: 0,
          goals: 2,
          points: 6,
          alternatePoints: 13,
          __v: 0,
        },
      ],
      __v: 36,
    },
  ];

  const [isClearDataOpen, setClearDataOpen] = useState(false);

  return (
    <div className="Homepage">
      {records.length > 0 ? (
        <>
          <span className="Homepage-clear-btn-row">
            <Button colorScheme="red" onClick={() => setClearDataOpen(true)}>
              Clear data
            </Button>
          </span>
          <div className="Homepage-group-standings">
            {records.map((g) => (
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
