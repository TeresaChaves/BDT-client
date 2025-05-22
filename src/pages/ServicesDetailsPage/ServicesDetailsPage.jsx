import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
import servicesService from "../../services/services.service";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import EditServiceForm from "../../components/EditServiceForm/EditServiceForm";
import Loader from "../../components/Loader/Loader";
import HireServiceForm from "../../components/HireServiceForm/HireServiceForm";
import "./ServicesDetailsPage.css";
import { RoughNotation } from "react-rough-notation";

function ServiceDetailsPage() {
  const { service_id } = useParams();
  const [service, setService] = useState();
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = () => {
    !user ? navigate("/usuario/iniciar-sesion") : setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalDelete(false);
  };

  const [modalDelete, setModalDelete] = useState(false);

  const openModalDelete = () => {
    setModalDelete(true);
  };

  useEffect(() => {
    loadService();
  }, []);

  const loadService = () => {
    servicesService
      .getOneService(service_id)
      .then(({ data }) => setService(data))
      .catch((err) => console.error(err));
  };

  const delOneServcice = () => {
    servicesService
      .deleteService(service_id)
      .then(() => {
        navigate(`/usuario/mi-perfil`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <>
        {!service ? (
          <Loader />
        ) : (
          <Container>
            <div class="parent_ServiceDetailPage">
              <div class="div1_containerDetail_title_header">
                <div className="containerDetail_title_header">
                  <h1 className="title_header"> {service.name}</h1>
                </div>
              </div>
              <div class="div2_containerDetail_image_header">
                {" "}
                <div className="containerDetail_image_header">
                  <img src={service.image} alt="imagen del servicio" />
                </div>
              </div>
              <div class="div4_container_description_cardDetail">
                <div className="container_description_cardDetail">
                  {" "}
                  <p className="description_cardDetail">
                    {service.name}:
                    <br />
                    {service.description}
                  </p>
                </div>
              </div>
              <div class="div5_display_valoracion">
                <div className="display_valoracion">
                  <h3 className="card_description_title">VALORACION</h3>
                  <span>⭐⭐⭐</span>
                </div>
              </div>
              <div className="div7_container_disponibility-div">
                <div className="container_disponibility-div">
                  <div>
                    <h3 className="card_description_title">
                      ¿CUÁNDO LO QUIERES?
                    </h3>
                  </div>
                  <div className="container_disponibility"></div>
                  <div className="calendar-container">
                    <div className="calendar_detail">
                      <span className="day_calendar">MIE</span>
                      <br />
                      <span className="hours_calendar">17:00</span>
                    </div>
                    <div className="calendar_detail">
                      <span className="day_calendar">MIE</span>
                      <br />
                      <span className="hours_calendar">17:00</span>
                    </div>
                  </div>

                  <div className="buttons_contract">
                    {service?.owner?._id == user?._id ? (
                      <>
                        <button onClick={openModal} className="btnContratar">
                          Editar
                        </button>

                        <Modal show={showModal} onHide={closeModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Editar{" "}
                              <span style={{ fontWeight: "100" }}>
                                {service.name}
                              </span>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <EditServiceForm
                              {...service}
                              closeModal={closeModal}
                              loadService={loadService}
                            />
                          </Modal.Body>
                        </Modal>
                        <Col>
                          <div>
                            <button
                              className="btnContratar-eliminar"
                              onClick={openModalDelete}>
                              Eliminar
                            </button>
                            <Modal show={modalDelete} onHide={closeModal}>
                              <Modal.Header closeButton></Modal.Header>
                              <Modal.Body>
                                <Modal.Title>
                                  <div
                                    style={{
                                      fontWeight: "100",
                                      fontSize: "28px",
                                      letterSpacing: "-0.05em",
                                      lineHeight: "30px",
                                      marginBottom: "20px",
                                    }}>
                                    ¿Estás seguro de que quieres eliminar {""}
                                    <span
                                      style={{
                                        fontWeight: "100",
                                        fontSize: "40px",
                                        letterSpacing: "-0.05em",
                                        lineHeight: "30px",
                                        marginBottom: "20px",
                                      }}>
                                      {service.name}?
                                    </span>
                                  </div>
                                  <button
                                    onClick={delOneServcice}
                                    className="btn2">
                                    Eliminar
                                  </button>
                                </Modal.Title>
                              </Modal.Body>
                            </Modal>
                          </div>
                        </Col>
                      </>
                    ) : (
                      <>
                        <div className="mail">
                          <a href={`mailto:${service.owner.email}`}>
                            <button className="btnContratar">Contacta</button>
                          </a>
                        </div>
                        <button onClick={openModal} className="btnContratar">
                          Contratar
                        </button>
                        <Modal show={showModal} onHide={closeModal}>
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Title
                            style={{
                              fontWeight: "100",
                              fontSize: "50px",
                              letterSpacing: "-0.05em",
                              lineHeight: "60px",
                              marginBottom: "20px",
                            }}>
                            {service.name}
                          </Modal.Title>
                          <HireServiceForm
                            owner={service.owner}
                            loadService={loadService}
                            closeModal={closeModal}
                            serviceId={service._id}
                          />
                        </Modal>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div class="div6_container_title_footer_detail">
                <div className="container_title_footer_detail">
                  <h2 className="title_footer_detail">TUTIEMPOVALEORO</h2>
                </div>
              </div>
              <div class="background-half grid-background"></div>
            </div>
          </Container>
        )}
      </>
    </>
  );
}

export default ServiceDetailsPage;
