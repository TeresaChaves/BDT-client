import "./ProfilePage.css";
import servicesService from "../../services/services.service";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
import { AuthContext } from "../../contexts/auth.context";
import { useState, useContext, useEffect } from "react";
import { MessageContext } from "../../contexts/userMessage.context";
import { Container, Row, Modal } from "react-bootstrap";
import { RoughNotation } from "react-rough-notation";
import uploadHours from "../../services/hours.service";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function ProfilePage() {
  const [profileServices, setProfileServices] = useState([]);
  const [serviceRequest, setServiceRequest] = useState([]);
  const [contractedServices, setContractedServices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { setShowToast, setToastMessage } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      const loadData = async () => {
        try {
          const [contractedData, requestData] = await Promise.all([
            uploadHours.getServicesContracted(user._id),
            uploadHours.getServiceRequests(user._id),
          ]);

          setContractedServices(contractedData.data);
          setServiceRequest(requestData.data);
        } catch (err) {
          console.error("Error cargando datos:", err);
          setShowToast(true);
          setToastMessage("Error al cargar los datos. Intenta de nuevo.");
        }
      };

      loadData();
    }
  }, [user?._id]); // <- Se ejecuta cuando user._id cambia

  const loadServicesProfile = () => {
    servicesService
      .getServices(user._id)
      .then(({ data }) => {
        setProfileServices(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadServicesProfile();
  }, []);

  const fireFinalActions = () => {
    setShowToast(true);
    setToastMessage("Nuevo servicio creado");
    closeModal();
    loadServices();
  };

  const handleAcceptRequest = async (request) => {
    try {
      // 1. Actualización optimista (frontend primero)
      setServiceRequest((prevRequests) =>
        prevRequests.map((req) =>
          req._id === request._id ? { ...req, status: "aceptado" } : req
        )
      );

      // 2. Llamada al backend
      await uploadHours.acceptServiceContract(
        request.client._id,
        request.service._id
      );

      // 3. Opcional: Verificación final
      const { data: updatedRequests } = await uploadHours.getServiceRequests(
        user._id
      );
      setServiceRequest(updatedRequests);

      setShowToast(true);
      setToastMessage("Solicitud aceptada correctamente");
    } catch (error) {
      // Si falla, revertimos la actualización optimista
      setServiceRequest((prevRequests) =>
        prevRequests.map((req) =>
          req._id === request._id ? { ...req, status: "pendiente" } : req
        )
      );

      setShowToast(true);
      setToastMessage("Error aceptando solicitud: " + error.message);
    }
  };
  return (
    <>
      <Container>
        <>
          <div class="parent_ProfilePage">
            <div class="div1">
              {" "}
              <Row>
                <div style={{ marginBottom: "30px" }}></div>
                <div className="container5">
                  <div className="container_name">
                    <p>{user.username}</p>
                    <img src={user.avatar} className="avatar" />
                  </div>

                  <div className="container_hour">
                    TIENES{" "}
                    <RoughNotation type="highlight" color="yellow" show>
                      <span>{user.bankAccountTime}</span>
                    </RoughNotation>
                    HORAS
                  </div>
                </div>
              </Row>
            </div>
            <div class="div2">
              <div className="container_button-create_profile">
                {" "}
                {user && (
                  <div>
                    <button className="btn2 btn2--profile" onClick={openModal}>
                      Crear Nuevo Servicio
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div class="div3">
              <div className="div3_container_title_footer_detail">
                <h2 className="title_intermediate_offer">
                  SERVICIOS QUE OFRECES
                </h2>
              </div>
            </div>
            <div class="div4">
              <h3 className="title_section-profile">TUS SERVICIOS</h3>
              <div className="div4_container">
                {profileServices.map((el, idx) => (
                  <>
                    <div className="card_profile-tusservicios" id={idx}>
                      <div className="card_profile_container_name">
                        <span>{el.name}</span>
                      </div>
                      <div className="card_profile-body-tusservicios">
                        <div className="stars">⭐⭐⭐</div>
                        <div className="button-edit-container">
                          <button className="btn2 btn2--edit">Editar</button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            </div>
            <div class="div5">
              {" "}
              <h3 className="title_section-profile" style={{ color: "white" }}>
                SOLICITUDES PENDIENTES
              </h3>
              <SimpleBar style={{ maxHeight: "100%" }}>
                <div className="div4_container">
                  {serviceRequest
                    .filter(
                      (request) =>
                        request?.service && request?.status === "pendiente"
                    )
                    .map((request, idx) => (
                      <>
                        <div className="card_profile-tusservicios" id={idx}>
                          <div className="card_profile_container_name">
                            <span style={{ color: "white" }}>
                              {request?.service?.name}
                            </span>
                          </div>
                          <div className="card_profile-body-solicitudes">
                            <div className="calendar-container--sm">
                              <div className="calendar_detail--sm">
                                <span className="day_calendar--sm">MIE</span>
                                <br />
                                <span className="hours_calendar--sm">
                                  17:00
                                </span>
                              </div>
                              <div className="calendar_detail--sm">
                                <span className="day_calendar--sm">
                                  {request?.hours}
                                </span>
                                <br />
                                <span className="calendar_detail-text_hours">
                                  HORAS
                                </span>
                              </div>
                            </div>

                            <div className="button-edit-container">
                              <button
                                className="btn2 btn2--accept"
                                onClick={() => handleAcceptRequest(request)}>
                                Aceptar
                              </button>
                            </div>
                            <div className="button-edit-container">
                              <button className="btn2 btn2--delete">
                                {" "}
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr style={{ color: "white" }} />
                      </>
                    ))}
                </div>
              </SimpleBar>
            </div>
            <div className="div6">
              {" "}
              <h3 className="title_section-profile">SOLICITUDES ACEPTADAS</h3>
              <SimpleBar style={{ maxHeight: "100%" }}>
                <div className="div4_container">
                  {serviceRequest
                    .filter(
                      (request) =>
                        request?.service && request?.status === "aceptado"
                    )
                    .map((request, idx) => (
                      <>
                        <div className="card_profile-tusservicios" key={idx}>
                          <div className="card_profile_container_name">
                            <span>{request?.service?.name}</span>
                          </div>
                          <div className="card_profile-body-solicitudes">
                            <div className="calendar-container--sm">
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  MIE
                                </span>
                                <br />
                                <span
                                  className="hours_calendar--sm"
                                  style={{ color: "white" }}>
                                  17:00
                                </span>
                              </div>
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  {request?.hours}
                                </span>
                                <br />
                                <span
                                  className="calendar_detail-text_hours"
                                  style={{ color: "white" }}>
                                  HORAS
                                </span>
                              </div>
                              <div className="button-edit-container">
                                <button className="btn2 btn2--accept">
                                  {" "}
                                  Finalizar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}
                </div>
              </SimpleBar>
            </div>

            <div class="div7">
              {" "}
              <div className="div3_container_title_footer_detail">
                <h2 className="title_intermediate_offer">
                  SERVICIOS QUE PIDES
                </h2>
              </div>
            </div>
            <div class="div8">
              <h3 className="title_section-profile">SOLICITUDES PENDIENTES</h3>
              <SimpleBar style={{ maxHeight: "100%" }}>
                <div className="div4_container">
                  {contractedServices
                    .filter(
                      (request) =>
                        request?.service && request?.status === "pendiente"
                    )
                    .map((request, idx) => (
                      <>
                        <div className="card_profile-tusservicios" id={idx}>
                          <div className="card_profile_container_name">
                            <span>{request?.service?.name}</span>
                          </div>
                          <div className="card_profile-body-solicitudes">
                            <div className="calendar-container--sm">
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  MIE
                                </span>
                                <br />
                                <span
                                  className="hours_calendar--sm"
                                  style={{ color: "white" }}>
                                  17:00
                                </span>
                              </div>
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  {request?.hours}
                                </span>
                                <br />
                                <span
                                  className="calendar_detail-text_hours"
                                  style={{ color: "white" }}>
                                  HORAS
                                </span>
                              </div>
                              <div className="button-edit-container">
                                <span>Estado</span>
                                <br />
                                <button className="btn2 btn2--accept">
                                  {" "}
                                  {request.status}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}
                </div>
              </SimpleBar>
            </div>
            <div class="div9">
              {" "}
              <h3 className="title_section-profile">SOLICITUDES ACEPTADAS</h3>
              <SimpleBar style={{ maxHeight: "100%" }}>
                <div className="div4_container">
                  {contractedServices
                    .filter(
                      (request) =>
                        request?.service && request?.status === "aceptado"
                    )
                    .map((request, idx) => (
                      <>
                        <div className="card_profile-tusservicios" id={idx}>
                          <div className="card_profile_container_name">
                            <span>{request?.service?.name}</span>
                          </div>
                          <div className="card_profile-body-solicitudes">
                            <div className="calendar-container--sm">
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  MIE
                                </span>
                                <br />
                                <span
                                  className="hours_calendar--sm"
                                  style={{ color: "white" }}>
                                  17:00
                                </span>
                              </div>
                              <div
                                className="calendar_detail--sm"
                                style={{ backgroundColor: "black" }}>
                                <span
                                  className="day_calendar--sm"
                                  style={{ color: "white" }}>
                                  {request?.hours}
                                </span>
                                <br />
                                <span
                                  className="calendar_detail-text_hours"
                                  style={{ color: "white" }}>
                                  HORAS
                                </span>
                              </div>
                              <div className="button-edit-container">
                                <span>Estado</span>
                                <br />
                                <button className="btn2 btn2--accept">
                                  {" "}
                                  {request.status}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}
                </div>
              </SimpleBar>
            </div>
          </div>
        </>
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
