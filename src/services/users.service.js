import axios from 'axios'

class UploadUsers {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/uploadUsers`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }
    updateUser(owner, bankAccountTime) {
        return this.api.put(`/update-user/${owner}`, bankAccountTime)
    }


}

const uploadUsers = new UploadUsers()

export default uploadUsers