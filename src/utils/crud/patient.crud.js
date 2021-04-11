import axios from "axios";

export const getAllPatients = (params) =>
  axios.get("/api/patients/all", { params });
export const getPatientById = (params) =>
  axios.get(`/api/patients/one`, { params });
export const createPatient = (data) => axios.post("/api/patients/create", data);
export const updatePatient = (data) => axios.put("/api/patients/update", data);
export const createVital = (data) => axios.put("/api/patients/vital", data);
export const removePatient = (params) =>
  axios.put(`/api/patients/remove`, null, { params });
