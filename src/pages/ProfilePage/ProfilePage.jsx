import "./ProfilePage.css";
import servicesService from "../../services/services.service";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
import { AuthContext } from "../../contexts/auth.context";
import { useState, useContext, useEffect } from "react";
import { MessageContext } from "../../contexts/userMessage.context";
import { Container, Modal } from "react-bootstrap";
import uploadHours from "../../services/hours.service";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Link } from "react-router-dom";
import EmptyData from "../../components/EmptyData/EmptyData";
import InfoProfile from "../../components/ProfileComponents/InfoProfile";
import CalendarSM from "../../components/ProfileComponents/CalendarSM";
import { RoughNotation } from "react-rough-notation";

function ProfilePage() {
  const [profileServices, setProfileServices] = useState([]);
  const [serviceRequest, setServiceRequest] = useState([]);
  const [contractedServices, setContractedServices] = useState([]);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedServiceToRate, setSelectedServiceToRate] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { setShowToast, setToastMessage } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  const openRatingModal = (serviceRequest) => {
    setSelectedServiceToRate(serviceRequest);
    setShowRatingModal(true);
  };

  const handleSubmitRating = async () => {
    try {
      const ratingData = {
        rating: ratingValue,
        comment: ratingComment,
      };

      await servicesService.rateService(
        selectedServiceToRate.service._id,
        ratingData
      );

      setShowToast(true);
      setToastMessage("Valoración enviada con éxito");

      // Opcional: refrescar datos
      const { data: updatedRequests } = await uploadHours.getServiceRequests(
        user._id
      );
      setContractedServices(updatedRequests);

      // Reset modal
      setShowRatingModal(false);
      setRatingValue(0);
      setRatingComment("");
    } catch (err) {
      setShowToast(true);
      setToastMessage("Error al enviar valoración");
    }
  };

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
    closeModal();
    loadServicesProfile();
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

  const handleFinishContract = async (request) => {
    try {
      await uploadHours.finishServiceContract(
        request.client._id,
        request.service._id
      );

      // Obtener las solicitudes actualizadas desde el backend
      const { data: updatedRequests } = await uploadHours.getServiceRequests(
        user._id
      );

      setServiceRequest(updatedRequests);

      setShowToast(true);
      setToastMessage("Contrato finalizado con éxito");
    } catch (error) {
      setShowToast(true);
      setToastMessage("Error al finalizar el contrato");
    }
  };

  const pendingRequests = serviceRequest.filter(
    (request) => request?.service && request?.status === "pendiente"
  );
  const acceptedRequest = serviceRequest.filter(
    (request) => request?.service && request?.status === "aceptado"
  );

  const pendingContractedServices = contractedServices.filter(
    (request) => request && request.status === "pendiente"
  );
  const acceptedOrFinished = contractedServices.filter(
    (request) =>
      request?.service &&
      (request.status === "aceptado" || request.status === "finalizado")
  );

  return (
    <>
      <Container>
        <>
          <div class="parent_ProfilePage">
            <div class="div1">
              {" "}
              <InfoProfile user={user} />
            </div>
            <div className="div2-container-button-create-service">
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
            <div className="div3">
              <div className="div3_container_title_footer_detail">
                <h2 className="title_intermediate_offer">
                  SERVICIOS QUE OFRECES
                </h2>
              </div>
            </div>
            <div className="div4">
              <h3 className="title_section-profile">TUS SERVICIOS</h3>
              <span
                className="title_section-profile-subtext"
                style={{ color: "black" }}>
                que ofreces a la comunidad
              </span>
              {profileServices.length === 0 ? (
                <>
                  {" "}
                  <div className="container-emptyData">
                    <span style={{ color: "black" }}>
                      ¡Anímate,{" "}
                      <RoughNotation
                        type="bracket"
                        brackets={["left", "right"]}
                        color="black">
                        <b
                          style={{
                            textTransform: "capitalize",
                            color: "black",
                          }}>
                          {user.username}
                        </b>
                      </RoughNotation>
                      sube tu primer servicio y empieza a intercambiar hroas con
                      la comunidad!⏱️
                    </span>
                    <div></div>
                  </div>
                  <div className="container-button-noservice">
                    <button className="btn2 btn2--profile" onClick={openModal}>
                      Crear Nuevo Servicio
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              <SimpleBar style={{ maxHeight: "100%" }}>
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
                            <Link to={`/servicios/detalles/${el._id}`}>
                              <button className="btn2 btn2--edit">
                                Editar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
              </SimpleBar>
            </div>
            <div className="div5">
              {" "}
              <h3 className="title_section-profile" style={{ color: "white" }}>
                SOLICITUDES PENDIENTES
              </h3>
              <span className="title_section-profile-subtext">
                de los servicios que ofreces
              </span>
              {pendingRequests.length === 0 ? (
                <>
                  <EmptyData whiteText="true" />
                  <hr style={{ color: "white" }} />
                </>
              ) : (
                <>
                  <SimpleBar style={{ maxHeight: "100%" }}>
                    <div className="div4_container">
                      {pendingRequests?.map((request, idx) => (
                        <>
                          <div className="card_profile-tusservicios" id={idx}>
                            <div className="card_profile_container_name">
                              <span style={{ color: "white" }}>
                                {request?.service?.name}
                              </span>
                            </div>
                            <div className="card_profile-body-solicitudes">
                              <CalendarSM hours={request?.hours} />
                              <div className="button-profile-container">
                                <div className="button-edit-container">
                                  <button
                                    className="btn2 btn2--accept"
                                    onClick={() =>
                                      handleAcceptRequest(request)
                                    }>
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
                          </div>
                          <hr style={{ color: "white" }} />
                        </>
                      ))}
                    </div>
                  </SimpleBar>
                </>
              )}{" "}
            </div>
            <div className="div6">
              {" "}
              <h3 className="title_section-profile">SOLICITUDES ACEPTADAS</h3>
              <span
                className="title_section-profile-subtext"
                style={{ color: "black" }}>
                de los servicios que ofreces
              </span>
              {acceptedRequest.length === 0 ? (
                <>
                  <EmptyData color="white" />
                  <hr />
                </>
              ) : (
                <>
                  <SimpleBar style={{ maxHeight: "100%" }}>
                    <div className="div4_container">
                      {acceptedRequest?.map((request, idx) => (
                        <>
                          <div className="card_profile-tusservicios" key={idx}>
                            <div className="card_profile_container_name">
                              <span>{request?.service?.name}</span>
                            </div>
                            <div className="card_profile-body-solicitudes">
                              <CalendarSM
                                hours={request.hours}
                                blackBackgroung
                              />
                              <div className="button-edit-container">
                                <button
                                  className="btn2 btn2--accept"
                                  onClick={() => handleFinishContract(request)}>
                                  Finalizar
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      ))}
                    </div>
                  </SimpleBar>
                </>
              )}
            </div>

            <div className="div7">
              {" "}
              <div className="div3_container_title_footer_detail">
                <h2 className="title_intermediate_offer">
                  SERVICIOS QUE PIDES
                </h2>
              </div>
            </div>
            <div className="div8">
              <h3 className="title_section-profile">SOLICITUDES PENDIENTES</h3>
              <span
                className="title_section-profile-subtext"
                style={{ color: "black" }}>
                de los servicios que pides
              </span>
              {pendingContractedServices?.length === 0 ? (
                <>
                  <EmptyData color="white" />
                  <hr />
                </>
              ) : (
                <>
                  {" "}
                  <SimpleBar style={{ maxHeight: "100%" }}>
                    <div className="div4_container">
                      {pendingContractedServices?.map((request, idx) => (
                        <>
                          <div className="card_profile-tusservicios" id={idx}>
                            <div className="card_profile_container_name">
                              <span>{request?.service?.name}</span>
                            </div>
                            <div className="card_profile-body-solicitudes">
                              <CalendarSM
                                hours={request?.hours}
                                blackBackgroung
                              />
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
                          <hr />
                        </>
                      ))}
                    </div>
                  </SimpleBar>
                </>
              )}
            </div>
            <div className="div9">
              {" "}
              <h3 className="title_section-profile">SOLICITUDES ACEPTADAS</h3>
              <span
                className="title_section-profile-subtext"
                style={{ color: "black" }}>
                de los servicios que pides
              </span>
              {acceptedOrFinished.length === 0 ? (
                <>
                  <EmptyData color="white" />
                  <hr />
                </>
              ) : (
                <>
                  {" "}
                  <SimpleBar style={{ maxHeight: "100%" }}>
                    <div className="div4_container">
                      {acceptedOrFinished?.map((request, idx) => (
                        <>
                          <div className="card_profile-tusservicios" id={idx}>
                            <div className="card_profile_container_name">
                              <span>{request?.service?.name}</span>
                            </div>
                            <div className="card_profile-body-solicitudes">
                              <CalendarSM
                                hours={request?.hours}
                                blackBackgroung
                              />
                              <div className="button-edit-container">
                                <span>
                                  {request.status === "finalizado"
                                    ? ""
                                    : "Estado"}
                                </span>
                                <br />
                                <button
                                  className={
                                    request.status === "finalizado"
                                      ? "btn2 btn2--rate"
                                      : "btn2 btn2--accept"
                                  }
                                  onClick={
                                    request.status === "finalizado"
                                      ? () => openRatingModal(request)
                                      : undefined
                                  }>
                                  {request.status === "finalizado"
                                    ? "Valorar"
                                    : request.status}
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      ))}
                    </div>
                  </SimpleBar>
                </>
              )}
              <></>
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

      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Valora el servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>⭐ Puntuación:</label>
          <select
            value={ratingValue}
            onChange={(e) => setRatingValue(Number(e.target.value))}
            className="form-control">
            <option value="0">Selecciona una puntuación</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>

          <label className="mt-3">📝 Comentario:</label>
          <textarea
            className="form-control"
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
            rows={3}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn2 btn2--cancel"
            onClick={() => setShowRatingModal(false)}>
            Cancelar
          </button>
          <button className="btn2 btn2--accept" onClick={handleSubmitRating}>
            Enviar valoración
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePage;
