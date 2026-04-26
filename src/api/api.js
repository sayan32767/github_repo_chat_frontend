import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/auth/login`, data);

export const fetchRepo = (owner, repo) =>
  axios.get(`${BASE_URL}/repo`, {
    params: { owner, repo },
    headers: getHeaders(),
  });
