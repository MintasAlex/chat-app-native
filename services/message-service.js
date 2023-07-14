import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.150:8080/message";

const getMessageById = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/${id}`, { headers: header });
}

const getMessagesByConversationId = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/conversation/${id}`, { headers: header });
}

const postMessage = async (conversationId, senderId, content) => {
    const header = await authHeader();
    return axios.post(API_URL, { conversationId, senderId, content }, { headers: header });
}

const messageService = {
    getMessageById,
    getMessagesByConversationId,
    postMessage,
}

export default messageService;
