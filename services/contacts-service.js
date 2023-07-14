import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.150:8080/contact";

const getContactsByUserId = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/user/${id}`, { headers: header });
}

const ContactsService = {
    getContactsByUserId
}

export default ContactsService;


