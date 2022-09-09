import React, { useEffect, useMemo, useState } from "react";
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
  if (!parseInt(data[2])) {
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

const DataInputPage = () => {
  const { data: teamsData } = useTeamsData();
  const teams = useMemo(() => teamsData || [], [teamsData]);
  const [isTeams, setIsTeams] = useState(teams.length === 0);

  const [teamsField, setTeams] = useState("");

  const [errors, setErrors] = useState(null);

  const {
    mutate: addTeams,
    isLoading: isAddingTeams,
    isSuccess: isAddTeamsSuccess,
  } = useAddTeams();

  useEffect(() => {
    if (isAddTeamsSuccess) {
      setIsTeams(false);
    }
  }, [isAddTeamsSuccess]);

  const handleSubmit = () => {
    if (isTeams) {
      const teamInfoArray = teamsField.split(/\r?\n/);
      const msg = isTeamFieldValid(teamInfoArray);
      setErrors({ teams: msg });
      if (!msg) {
        // if there is no message, then validation passed
        addTeams(formatTeams(teamInfoArray));
      }
    }
  };

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
        <FormControl className="DataInput-textarea-control">
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
          <Textarea className="DataInput-textarea" />
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>
      </Slide>
      <div className="DataInput-footer">
        <Button>Cancel</Button>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isTeams
            ? isAddingTeams
              ? "Adding teams"
              : "Add teams"
            : "Add matches"}
        </Button>
      </div>
    </div>
  );
};

export default DataInputPage;
