import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL = "http://192.168.1.150:8080/api/auth";

const storeData = async (key, value) => {
  // console.log("key " + key + " value " + value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
}

const signup = (username, email, password) => {
  return axios
    .post(API_URL + "/signup", {
      username,
      password,
      email,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        AsyncStorage.removeItem("user");
        // localStorage.setItem("user", JSON.stringify(response.data));
        storeData("user", JSON.stringify(response.data));
        return response.data;
      }
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  AsyncStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = await getData("user");
  return JSON.parse(user);
};

const refreshToken = () => {
  const user = getData("user");
  const refreshToken = user.refreshToken;
  return axios
    .post(API_URL + "/refreshtoken", {
      refreshToken,
    })
    .then((response) => {
      if (response.data.token) {
        AsyncStorage.removeItem("user");
        storeData("user", JSON.stringify(response.data));
        return response.data;
      }
    });
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};

export default authService;
