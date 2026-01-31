import api from "./api";
const API_URL = import.meta.env.VITE_AUTH_URL;

import TokenService from "./token.service";

const register = async ( username, email, phone , password ) => {
  console.log("API URL ", API_URL);
  return await api.post(API_URL + "/register", { username, email, phone , password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  const { status, data } = response;
  if (status === 200) {
    if (data?.accessToken) {
      TokenService.setUser(data);
    }
  }
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;