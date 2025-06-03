import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import servicesService from "../../services/services.service";
import uploadServices from "../../services/upload.service";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useAbbreviatonDay from "./../../utils/useAbbreviation";

function AddServiceForm({ fireFinalActions }) {
  const [serviceData, setDataService] = useState({
    name: "",
    description: "",
    image: "",
    disponibility: [], // ahora es un array desde el principio
  });

  const getAbbreviation = useAbbreviatonDay();

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataService({ ...serviceData, [name]: value });
  };
  const handleAddDisponibility = () => {
    if (day && time) {
      const newDisponibility = [...serviceData.disponibility, { day, time }];
      setDataService({ ...serviceData, disponibility: newDisponibility });
      setDay("");
      setTime("");
    }
  };

  const handleFileUpload = (e) => {
    setLoadingImage(true);

    const formData = new FormData();
    formData.append("imageData", e.target.files[0]);
    uploadServices
      .uploadimage(formData)
      .then((res) => {
        setDataService({ ...serviceData, image: res.data.cloudinary_url });
        setLoadingImage(false);
      })
      .catch((err) => console.log(err));
  };
  const { name, description } = serviceData;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!serviceData.disponibility.length) {
      setErrors(["Debes añadir al menos una disponibilidad."]);
      return;
    }

    servicesService
      .saveService(serviceData)
      .then(() => fireFinalActions())
      .catch((err) => setErrors(err.response.data.errorMessages));
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleInputChange}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={handleInputChange}
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="disponibility">
          <Form.Label>Días y horas disponibles</Form.Label>
          <Row>
            <Col>
              <Form.Select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Selecciona un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="secondary" onClick={handleAddDisponibility}>
                Añadir
              </Button>
            </Col>
          </Row>
          <ul className="mt-2">
            {serviceData.disponibility.map((slot, idx) => (
              <li key={idx}>
                {getAbbreviation(slot.day)} a las {slot.time}
              </li>
            ))}
          </ul>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Col>
        </Row>
        {errors.length ? (
          <ErrorMessage>
            {errors.map((elm) => (
              <p key={elm}>{elm}</p>
            ))}
          </ErrorMessage>
        ) : undefined}
        <div className="d-grid">
          <button className="btn4" type="submit" disabled={loadingImage}>
            {loadingImage ? "Subiendo imagen..." : "Crear Servicio"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddServiceForm;
