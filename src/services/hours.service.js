import axios from 'axios'

class UploadHours {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/uploadHours`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAvailableHours(user_id) {
        return this.api.get(`/get-available-hours/${user_id}`)
    }

    updateHours(ownerId, bankAccountTime) {
        return this.api.put(`/update-hours/${ownerId}`, { hours: bankAccountTime })
    }


}

const uploadHours = new UploadHours()

export default uploadHours