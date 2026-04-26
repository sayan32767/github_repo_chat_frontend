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
  axios.get(`${BASE_URL}/repo?owner=${owner}&repo=${repo}`, {
    headers: getHeaders(),
  });

export const processRepo = (owner, repo) =>
  axios.post(`${BASE_URL}/repo/process`, { owner, repo }, { headers: getHeaders() });

export const queryRepo = (repo, question) =>
  axios.post(`${BASE_URL}/repo/query`, { repo, question }, { headers: getHeaders() });

export const getRepoStatus = (owner, repo) =>
  axios.get(`${BASE_URL}/repo/status`, {
    params: { owner, repo },
    headers: getHeaders(),
  });
