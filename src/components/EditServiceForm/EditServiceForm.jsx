import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import servicesService from "../../services/services.service";
import uploadServices from "../../services/upload.service";
// import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { FiTrash2 } from "react-icons/fi";

function EditServiceForm({
  _id,
  name,
  description,
  image,
  disponibility,
  closeModal,
  loadService,
}) {
  const [editServ, setEditService] = useState({
    name: name,
    description: description,
    image: image,
    disponibility: disponibility,
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditService({ ...editServ, [name]: value });
  };

  const handleFileUpload = (e) => {
    setLoadingImage(true);

    const formData = new FormData();
    formData.append("imageData", e.target.files[0]);
    uploadServices
      .uploadimage(formData)
      .then((res) => {
        setEditService({ ...editServ, image: res.data.cloudinary_url });
        setLoadingImage(false);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!editServ.disponibility.length) {
      setErrors(["Debes añadir al menos una disponibilidad."]);
      return;
    }

    servicesService
      .editService(_id, editServ)
      .then(() => {
        loadService();
        closeModal();
      })
      .catch((err) => setErrors(err.response.data.errorMessages));
  };

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const handleAddDisponibility = () => {
    if (day && time) {
      const newDisponibility = [...editServ.disponibility, { day, time }];
      setEditService({ ...editServ, disponibility: newDisponibility });
      setDay("");
      setTime("");
    }
  };
  const handleRemoveDisponibility = (indexToRemove) => {
    const newDisponibility = editServ.disponibility.filter(
      (_, idx) => idx !== indexToRemove
    );
    setEditService({ ...editServ, disponibility: newDisponibility });
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={editServ.name}
            onChange={handleInputChange}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={editServ.description}
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
            {editServ.disponibility.map((slot, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                {slot.day} a las {slot.time}
                <FiTrash2
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleRemoveDisponibility(idx)}
                />
              </li>
            ))}
          </ul>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-grid">
          <button className="btn4" type="submit" disabled={loadingImage}>
            {loadingImage ? "Subiendo imagen..." : "Editar servicio"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditServiceForm;
