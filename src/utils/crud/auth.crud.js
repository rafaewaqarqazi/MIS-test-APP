import axios from "axios";

export const signIn = (data) => axios.post("/api/auth/signIn", data);
export const userSignUp = (data) => axios.post("/api/auth/signUp", data);
