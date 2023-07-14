import { AsyncStorage } from "@react-native-async-storage/async-storage";
import AuthService from "./auth-service";

const getHeaders = async () => {
  try {
    return AuthService.getCurrentUser().then((value) => {
      // console.log(value);
      return { Authorization: "Bearer " + value.token };
      // return value;
    });
  } catch (err) {
    console.log(err);
  }
};

export default getHeaders;

// const user = JSON.parse(getData("user"));

// if (user && user.token) {
//   return { Authorization: "Bearer " + user.token };
// } else {
//   return {};
// }
