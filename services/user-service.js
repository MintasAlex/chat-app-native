import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.150:8080/users";

const getUserById = async (id) => {
  const header = await authHeader();
  return axios.get(API_URL + `/${id}`, { headers: header });
};

const getUsernameById = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/${id}/username`, { headers: header });
}

const userService = {
    getUserById,
    getUsernameById
};

export default userService;