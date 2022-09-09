import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Slide,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import "./DataInput.css";
import useTeamsData from "./hooks/useTeamsData";
import useAddTeams from "./hooks/useAddTeams";
import {
  NUMBER_OF_GROUPS,
  NUMBER_OF_MATCHES,
  NUMBER_OF_TEAMS_PER_GROUP,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useAddMatches from "./hooks/useAddMatches";

const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const CURRENT_YEAR = dayjs().year();

const isTeamFormatValid = (info) => {
  const data = info.split(" ");
  if (data.length !== 3) {
    return false;
  }

  // check if registration date is in DD/MM format and is valid
  const date = dayjs(`${CURRENT_YEAR}/${data[1]}`, "YYYY/DD/MM", true);
  if (!date.isValid()) {
    return false;
  }

  // check if group number is an integer
  if (parseInt(data[2]) === null) {
    return false;
  }

  return true;
};

const isTeamFieldValid = (arr) => {
  if (arr.length !== NUMBER_OF_TEAMS_PER_GROUP * NUMBER_OF_GROUPS) {
    return `There should only be ${
      NUMBER_OF_GROUPS * NUMBER_OF_TEAMS_PER_GROUP
    } teams`;
  }

  for (const team of arr) {
    if (!isTeamFormatValid(team)) {
      return "Incorrect team information format";
    }
  }
  return "";
};

const formatTeams = (arr) => {
  const teams = [];
  for (const teamInfo of arr) {
    const data = teamInfo.split(" ");
    teams.push({
      name: data[0],
      registrationDate: dayjs(
        `${CURRENT_YEAR}/${data[1]}`,
        "YYYY/DD/MM",
        true
      ).toDate(),
      groupNo: data[2],
    });
  }

  return teams;
};

const isMatchFormatValid = (info) => {
  const data = info.split(" ");
  if (data.length !== 4) {
    console.log(info, data);
    return false;
  }

  // check if number of goals is an integer
  if (parseInt(data[2]) === null) {
    console.log(data[2]);
    return false;
  }

  if (parseInt(data[3]) === null) {
    console.log(data[3]);
    return false;
  }

  return true;
};

const isMatchFieldValid = (arr) => {
  if (arr.length !== NUMBER_OF_MATCHES) {
    return `There should only be ${NUMBER_OF_MATCHES} matches`;
  }

  for (const match of arr) {
    console.log(match);
    if (!isMatchFormatValid(match)) {
      return "Incorrect match information format";
    }
  }
  return "";
};

const formatMatches = (arr) => {
  const matches = [];
  for (const matchInfo of arr) {
    const data = matchInfo.split(" ");
    matches.push({
      team1: data[0],
      team2: data[1],
      team1Goals: data[2],
      team2Goals: data[3],
    });
  }

  return matches;
};

const DataInputPage = () => {
  const navigate = useNavigate();

  const { data: teamsData } = useTeamsData();
  const teams = useMemo(() => teamsData || [], [teamsData]);
  const [isTeams, setIsTeams] = useState(teams.length === 0);

  useEffect(() => {
    setIsTeams(teams.length === 0);
  }, [teams]);

  const [teamsField, setTeams] = useState("");
  const [matchesField, setMatches] = useState("");

  const [errors, setErrors] = useState(null);

  const {
    mutate: addTeams,
    isLoading: isAddingTeams,
    isSuccess: isAddTeamsSuccess,
  } = useAddTeams();
  const {
    mutate: addMatches,
    isLoading: isAddingMatches,
    isSuccess: isAddMatchesSuccess,
  } = useAddMatches();

  useEffect(() => {
    if (isAddTeamsSuccess) {
      setIsTeams(false);
    }
  }, [isAddTeamsSuccess]);

  useEffect(() => {
    if (isAddMatchesSuccess) {
      navigate("/");
    }
  }, [isAddMatchesSuccess, navigate]);

  const handleSubmit = useCallback(() => {
    if (isTeams) {
      const teamInfoArray = teamsField.split(/\r?\n/);
      const msg = isTeamFieldValid(teamInfoArray);
      setErrors({ teams: msg });
      if (!msg) {
        // if there is no message, then validation passed
        addTeams(formatTeams(teamInfoArray));
      }
    } else {
      const matchInfoArray = matchesField.split(/\r?\n/);
      const msg = isMatchFieldValid(matchInfoArray);
      setErrors({ matches: msg });
      if (!msg) {
        // if there is no message, then validation passed
        addMatches(formatMatches(matchInfoArray));
      }
    }
  }, [addMatches, addTeams, isTeams, matchesField, teamsField]);

  return (
    <div className="DataInput-container">
      <div className="DataInput-page-indicator">
        <Text textColor={!isTeams && "blackAlpha.500"}>Add teams</Text>
        <ChevronRightIcon />
        <Text textColor={isTeams && "blackAlpha.500"}>Add matches</Text>
      </div>
      <Slide
        className="DataInput-textarea-wrapper"
        direction="left"
        in={isTeams}
      >
        <FormControl
          className="DataInput-textarea-control"
          isInvalid={errors && errors.teams}
        >
          <FormHelperText>
            Please enter the team information in the following format:
          </FormHelperText>
          <FormHelperText color="teal">
            {`<team name> <team registration date in DD/MM> <team group number>`}
          </FormHelperText>
          <FormHelperText>
            Leave a line for each team. There must be {NUMBER_OF_GROUPS} groups
            of {NUMBER_OF_TEAMS_PER_GROUP} teams.
          </FormHelperText>
          <Textarea
            className="DataInput-textarea"
            onChange={(e) => setTeams(e.target.value)}
          />
          <FormErrorMessage>{errors && errors.teams}</FormErrorMessage>
        </FormControl>
      </Slide>
      <Slide
        className="DataInput-textarea-wrapper"
        direction="right"
        in={!isTeams}
      >
        <FormControl
          className="DataInput-textarea-control"
          isInvalid={errors && errors.matches}
        >
          <FormHelperText>
            Please enter the match information in the following format:
          </FormHelperText>
          <FormHelperText color="teal">
            {`<first team name> <second team name> <number of goals scored by first team> <number of goals scored by second team>`}
          </FormHelperText>
          <FormHelperText>
            Leave a line for each match. Each team must play a match against
            every other team in their group.
          </FormHelperText>
          <Textarea
            className="DataInput-textarea"
            onChange={(e) => setMatches(e.target.value)}
          />
          <FormErrorMessage>{errors && errors.matches}</FormErrorMessage>
        </FormControl>
      </Slide>
      <div className="DataInput-footer">
        <Button onClick={() => navigate("/")}>Cancel</Button>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isTeams
            ? isAddingTeams
              ? "Adding teams..."
              : "Add teams"
            : isAddingMatches
            ? "Adding matches..."
            : "Add matches"}
        </Button>
      </div>
    </div>
  );
};

export default DataInputPage;
