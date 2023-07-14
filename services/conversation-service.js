import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.150:8080/conversation";

const getConversationById = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/${id}`, { headers: header });
}

const postConversation = async (conversation) => {
    const header = await authHeader();
    return axios.post(API_URL, conversation, { headers: header });
}

const conversationService = {
    getConversationById,
    postConversation
}

export default conversationService;