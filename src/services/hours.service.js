import axios from "axios";

class UploadHours {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/uploadHours`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getAvailableHours(user_id) {
    return this.api.get(`/users/${user_id}/get-available-hours`);
  }

  updateHours(ownerId, bankAccountTime) {
    return this.api.put(`/update-hours/${ownerId}`, { hours: bankAccountTime });
  }
  getServicesContracted(user_id) {
    return this.api.get(`/users/${user_id}/services-contracted`);
  }

  saveServiceContract(ownerId, service_id, hours) {
    // Verifica si las horas están definidas
    if (!hours || isNaN(hours) || hours <= 0) {
      return Promise.reject(
        new Error("Las horas deben ser un valor válido mayor que 0")
      );
    }

    // Enviar el POST con el servicio y las horas, y pasar ownerId en los params
    return this.api.post(`/users/${ownerId}/contract-service`, {
      service_id,
      hours,
    });
  }
  getServiceRequests(user_id) {
    return this.api.get(`/users/${user_id}/get-services-requests`);
  }
  acceptServiceContract(clientId, serviceId) {
    return this.api.post("/services/accept", { clientId, serviceId });
  }
  finishServiceContract(clientId, serviceId) {
    return this.api.post("/services/finish", { clientId, serviceId });
  }
}

const uploadHours = new UploadHours();

export default uploadHours;
