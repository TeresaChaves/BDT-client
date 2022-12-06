import axios from 'axios'

class ServicesService {

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


    getServices() {
        return this.api.get('/allServices')
    }

    getOneService(service_id) {
        return this.api.get(`/serviceDetails/${service_id}`)
    }

    saveService(serviceData) {
        return this.api.post('/addService', serviceData)
    }
}

const servicesService = new ServicesService()

export default servicesService