import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import uploadHours from "../../services/hours.service";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { MessageContext } from "../../contexts/userMessage.context";
import "./HireServiceForm.css";

function HireServiceForm({ owner, loadService, closeModal, serviceId }) {
  const [hours, setHours] = useState(0);
  const [availableHours, setAvailableHours] = useState(0);
  const { user, refreshToken } = useContext(AuthContext);
  const { setShowToast, setToastMessage } = useContext(MessageContext);

  useEffect(() => {
    uploadHours
      .getAvailableHours(user?._id)
      .then(({ data }) => setAvailableHours(data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setHours(e.target.value);
  };

  const fireFinalActions = () => {
    setShowToast(true);
    setToastMessage("Has contratado el servicio");
    loadService();
    refreshToken();
    closeModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Verifica si las horas son válidas antes de hacer la solicitud
    if (hours <= 0 || hours > availableHours) {
      setShowToast(true);
      setToastMessage("La cantidad de horas debe ser válida.");
      return;
    }

    // Llamada para contratar el servicio, pasando el `owner._id`, las `hours`, y el `serviceId`
    uploadHours
      .saveServiceContract(owner._id, serviceId, hours)
      .then(() => {
        // Llamamos a la acción final solo después de que el servicio se haya contratado
        fireFinalActions();
      })
      .catch((err) => {
        console.log(err);
        closeModal();
        setShowToast(true);
        setToastMessage("Ha ocurrido un problema");
      });
  };

  return (
    <div className="content-contrato">
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Form.Label
            style={{
              fontSize: "22px",
              textAlign: "center",
              marginBottom: "20px",
              letterSpacing: "-0.05em",
            }}>
            ¿Cuánto tiempo necesitas?
          </Form.Label>
        </Row>
        <Row>
          <Col>
            <p>
              Te quedan <b>{availableHours}</b> horas
            </p>
          </Col>
          <Col>
            <p>
              Estás solicitando <b>{hours}</b> horas
            </p>
          </Col>
        </Row>
        <Form.Control
          type="number"
          value={hours}
          onChange={handleInputChange}
          name="bankAccountTime"
          min={0}
          max={availableHours}
        />
        <div style={{ marginTop: "20px" }}>
          <button className="btn2" style={{ marginLeft: "0px" }} type="submit">
            Contratar
          </button>
        </div>
      </Form>
    </div>
  );
}

export default HireServiceForm;
