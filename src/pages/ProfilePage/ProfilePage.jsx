import "./ProfilePage.css";
import servicesService from "../../services/services.service";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
import { AuthContext } from "../../contexts/auth.context";
import { useState, useContext, useEffect } from "react";
import { MessageContext } from "../../contexts/userMessage.context";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ProfileServices from "../../components/ProfileServices/ProfileServices";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileServices, setprofileServices] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { setShowToast, setToastMessage } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    servicesService
      .getServices(user._id)
      .then(({ data }) => {
        setprofileServices(data);
      })
      .catch((err) => console.log(err));
  };

  const fireFinalActions = () => {
    setShowToast(true);
    setToastMessage("Nuevo servicio creado");
    closeModal();
    loadServices();
  };

  return (
    <>
      <Container>
        <Row>
          <div className="container4">
            {" "}
            {user && (
              <button className="btn3" onClick={openModal}>
                Nuevo Servicio
              </button>
            )}
          </div>

          <div className="container5">
            <img src={user.avatar} className="avatar" />

            <div class="scene">
              <div class="cube">
                <span className="side top">
                  TIENES {user.bankAccountTime} HORAS
                </span>
                <span class="side front">TUS HORAS </span>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="span2">Tus servicios</div>
          <div>
            <ProfileServices
              className="yourService"
              profileServices={profileServices}
            />
          </div>
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddServiceForm fireFinalActions={fireFinalActions} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfilePage;
