import React from "react";
import {
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  // TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const NUMBER_OF_QUALIFIED_TEAMS = 4;

const StandingsTable = ({ teams }) => {
  return (
    <TableContainer
      sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "5px" }}
    >
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Team name</Th>
            <Th>W</Th>
            <Th>L</Th>
            <Th>D</Th>
            <Th>Goals</Th>
            <Th>Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.map((t, index) => (
            <Tr
              bgColor={
                index < NUMBER_OF_QUALIFIED_TEAMS ? "teal.100" : "gray.300"
              }
            >
              <Td>{index + 1}</Td>
              <Td>{t.name}</Td>
              <Td>{t.wins}</Td>
              <Td>{t.losses}</Td>
              <Td>{t.draws}</Td>
              <Td>{t.goals}</Td>
              <Td>{t.points}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StandingsTable;
