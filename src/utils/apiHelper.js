const BASE_URL = "http://localhost:5000";

const HEADERS = {
  "Content-type": "application/json",
};

const parseResp = async (res) => {
  if (!res.ok) {
    const data = await res.text();
    throw new Error(data);
  }
  return res.json();
};

export const getData = (path) => {
  return fetch(BASE_URL + path).then((res) => parseResp(res));
};

export const postData = (path, body) => {
  return fetch(BASE_URL + path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: HEADERS,
  }).then((res) => parseResp(res));
};

export const putData = (path, body) => {
  return fetch(BASE_URL + path, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: HEADERS,
  }).then((res) => parseResp(res));
};

export const deleteData = (path, body) => {
  return fetch(BASE_URL + path, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: HEADERS,
  }).then((res) => parseResp(res));
};
