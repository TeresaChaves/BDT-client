import axios from 'axios'

class ChatService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/services`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    cahtApi(io) {
        return this.api.get(`/chat`, io)
    }


}

const chatService = new ChatService()

export default chatService