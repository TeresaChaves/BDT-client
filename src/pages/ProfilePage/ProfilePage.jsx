import "./ProfilePage.css";
import servicesService from "../../services/services.service";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
import { AuthContext } from "../../contexts/auth.context";
import { useState, useContext, useEffect } from "react";
import { MessageContext } from "../../contexts/userMessage.context";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import ProfileServices from "../../components/ProfileServices/ProfileServices";
import uploadHours from "../../services/hours.service";

function ProfilePage() {
  const [profileServices, setProfileServices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [serviceRequest, setServiceRequest] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [contractedServices, setContractedServices] = useState([]);

  const { setShowToast, setToastMessage } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      uploadHours
        .getServicesContracted(user?._id)
        .then(({ data }) => setContractedServices(data))
        .catch((err) => console.error(err));

      uploadHours
        .getServiceRequests(user._id)
        .then(({ data }) => setServiceRequest(data))
        .catch((err) => console.error(err));
    }
  }, []);

  console.log(contractedServices);
  console.log(user);
  console.log("serviceRequest", serviceRequest);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    servicesService
      .getServices(user._id)
      .then(({ data }) => {
        setProfileServices(data);
      })
      .catch((err) => console.log(err));
  };

  const fireFinalActions = () => {
    setShowToast(true);
    setToastMessage("Nuevo servicio creado");
    closeModal();
    loadServices();
  };

  const handleAcceptRequest = async (request) => {
    try {
      const clientId = request.client._id; // cliente que solicita el servicio
      const serviceId = request.service._id; // servicio solicitado
      // ownerId se obtiene desde el token y no lo envías aquí explícitamente porque el backend lo extrae de req.payload._id

      await uploadHours.acceptServiceContract(clientId, serviceId);

      setShowToast(true);
      setToastMessage("Solicitud aceptada correctamente");

      // Recargar las solicitudes y contratos para actualizar la vista
      const updatedContracts = await uploadHours.getServicesContracted(
        user._id
      );
      setContractedServices(updatedContracts.data);

      const updatedRequests = await uploadHours.getServiceRequests(user._id);
      setServiceRequest(updatedRequests.data);
    } catch (error) {
      setShowToast(true);
      setToastMessage(
        "Error aceptando solicitud: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <>
      <Container>
        <Row>
          <div className="container4">
            {" "}
            {user && (
              <div>
                <button className="btn2" onClick={openModal}>
                  Crear Nuevo Servicio
                </button>
              </div>
            )}
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h1>{user.username}</h1>
            <span>{user._id}</span>
          </div>
          <div className="container5">
            <img src={user.avatar} className="avatar" />

            <div className="container_hour">
              TIENES{" "}
              <RoughNotation type="highlight" color="yellow" show>
                <span>{user.bankAccountTime}</span>
              </RoughNotation>
              HORAS
            </div>
          </div>
        </Row>
        {profileServices.length === 0 ? (
          <>
            {" "}
            <Row>
              <div className="span2">
                Aún no has subido ningún servicio, anímate 😎
              </div>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <div
                style={{
                  fontWeight: "100",
                  fontSize: "50px",
                  letterSpacing: "-0.05em",
                  marginBottom: "20px",
                }}>
                ¿Qué estás ofreciendo a la comunidad?
              </div>
              <div>
                <ProfileServices
                  className="yourService"
                  profileServices={profileServices}
                />
              </div>
            </Row>
          </>
        )}
        {contractedServices?.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h4>Servicios contratados</h4>
            <ul>
              {contractedServices?.map((contract, idx) => (
                <>
                  <div key={idx}>
                    <strong>{contract?.service?.name}</strong>
                    <li>Estado: {contract?.status}</li>
                    <li>Horas contratadas: {contract?.hours}</li>
                  </div>
                </>
              ))}
            </ul>
          </div>
        )}
        {serviceRequest?.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h4>Solicitudes pendientes</h4>
            <ul>
              {serviceRequest?.map((request, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <strong>{request?.service?.name}</strong>
                  {/* <li>Solicitado por: {request?.client}</li> */}
                  <li>Fecha: {new Date(request?.date).toLocaleDateString()}</li>
                  <li>Horas:{request.hours}</li>
                  <li>estado:{request.status}</li>

                  <button
                    className="btn btn-success btn-sm mt-2"
                    onClick={() => handleAcceptRequest(request)}>
                    Aceptar solicitud
                  </button>
                </div>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title
            style={{
              textAlign: "center",
              fontWeight: "100",
              fontSize: "50px",
              letterSpacing: "-0.05em",
            }}>
            ¿Qué sabes hacer?
            <p
              style={{
                opacity: "0.5",
                fontSize: "16px",
                letterSpacing: "0px",
              }}>
              Súbelo a tu comunidad y empieza a itercambiar horas con el resto
            </p>
          </Modal.Title>
          <AddServiceForm fireFinalActions={fireFinalActions} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfilePage;
