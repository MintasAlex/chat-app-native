import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.150:8080/participant";

const getParticipantById = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/${id}`, { headers: header });
}

const getParticipantsByConversationId = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/conversation/${id}`, { headers: header });
}

const getParticipantsByUserId = async (id) => {
    const header = await authHeader();
    return axios.get(API_URL + `/user/${id}`, { headers: header });
}

const postParticipant = async (participant) => {
    const header = await authHeader();
    return axios.post(API_URL, participant, { headers: header });
}

const participantService = {
    getParticipantById,
    getParticipantsByConversationId,
    getParticipantsByUserId,
    postParticipant
}

export default participantService;