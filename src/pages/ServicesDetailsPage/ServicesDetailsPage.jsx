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
      {/* <div className="img-sup_card">
        <img className="image3_sup" src={service?.image} alt="" />
      </div> */}

      <Container>
        {!service ? (
          <Loader />
        ) : (
          <>
            <div className="img-detail-card">
              <img className="image3" src={service.image} alt="" />
              <div className="image1-wrapper">
                <img className="image1" src={service.image} alt="" />
              </div>

              {/* <img className="image1" src={service.image} alt="" /> */}
              <img className="image2" src={service.image} alt="" />
            </div>
            <div>
              <div
                style={{
                  fontWeight: "100",
                  fontSize: "50px",
                  letterSpacing: "-0.05em",
                  marginBottom: "20px",
                  paddingTop: "20px",
                  display: "flex",
                }}>
                <RoughNotation type="box" color="red" show>
                  <span> {service.name}</span>
                </RoughNotation>
              </div>
              <div className="card_detail-services">
                <p>{service.description}</p>
              </div>
              <div
                style={{
                  fontWeight: "100",
                  fontSize: "32px",
                  letterSpacing: "-0.05em",
                  marginBottom: "20px",
                  display: "flex",
                }}>
                <RoughNotation type="underline" color="grey" show>
                  <span>Disponibilidad</span>
                </RoughNotation>
              </div>
              <p>{service.disponibility}</p>
              <div>
                <div className="containercontacto">
                  <div className="contratar-detail-container">
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
                          <div className="d-grid">
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
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default ServiceDetailsPage;
