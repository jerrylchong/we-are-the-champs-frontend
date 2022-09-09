// ENDPOINTS

import { deleteData, getData, postData, putData } from "./apiHelper";

const GET_TEAMS = "/teams";
const GET_STANDINGS = "/groups";

const ADD_TEAMS = "/teams";
const ADD_MATCHES = "/match";

const CLEAR_DATA = "/";

export const getTeams = () => {
  return getData(GET_TEAMS);
};

export const getStandings = () => {
  return getData(GET_STANDINGS);
};

export const addTeams = (teams) => {
  return postData(ADD_TEAMS, { teams });
};

export const addMatches = (matches) => {
  return putData(ADD_MATCHES, { matches });
};

export const clearData = () => {
  return deleteData(CLEAR_DATA, {});
};
