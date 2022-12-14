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


    getServices(userId) {
        return this.api.get(`/allServices?user=${userId}`)
    }

    getOneService(service_id) {
        return this.api.get(`/serviceDetails/${service_id}`)
    }

    saveService(serviceData) {
        return this.api.post('/addService', serviceData)
    }

    deleteService(service_id) {
        return this.api.delete(`/delete-service/${service_id}`)
    }

    editService(service_id, serviceData) {
        return this.api.put(`/edit-service/${service_id}`, serviceData)
    }
}

const servicesService = new ServicesService()

export default servicesService