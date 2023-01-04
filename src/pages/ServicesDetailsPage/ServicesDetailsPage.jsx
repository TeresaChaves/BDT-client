import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import EditServiceForm from "../../components/EditServiceForm/EditServiceForm"
import Loader from "../../components/Loader/Loader"
import HireServiceForm from "../../components/HireServiceForm/HireServiceForm"
import './ServicesDetailsPage.css'

function ServiceDetailsPage() {
    const { service_id } = useParams()
    const [service, setService] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const openModal = () => {
        !user
            ? navigate("/usuario/iniciar-sesion")
            : setShowModal(true)
    }
    const closeModal = () => setShowModal(false)


    useEffect(() => {
        loadService()
    }, [])

    const loadService = () => {
        servicesService
            .getOneService(service_id)
            .then(({ data }) => setService(data))
            .catch(err => console.error(err))
    }


    const delOneServcice = () => {
        servicesService
            .deleteService(service_id)
            .then(({ data }) => {
                loadServices()
            })
            .catch(err => console.error(err))
    }


    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => {
                setService(data)
            })
            .catch(err => console.log(err))
    }

    return (




        <Container>
            {!service ? <Loader />
                :
                <div >
                    <div className="container6"> <a href="#" class="button">
                        <div className="button__line"></div>
                        <div className="button__line"></div> <h4 class="button__text">detalles</h4>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>


                    </div>

                    <div className="profileCenter">
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <p class="title3">MI SERVICIO</p>
                                    <p className="cardName">{service.name}</p>
                                    <img className="detailPhoto" src={service.image} />


                                </div>
                                <div class="flip-card-back">
                                    <p class="title3">DESCRIPCIÓN</p>
                                    <p>{service.description}</p>
                                    <p class="title3">DISPONIBILIDAD</p>
                                    <p>{service.disponibility}</p>



                                    <Row>
                                        <div className="mail">
                                            <h4><a className="mailToOwner" href={`mailto:${service.owner.email}`}>Email</a></h4>

                                            <Container>
                                                {
                                                    service.owner._id == user?._id
                                                        ?
                                                        <>
                                                            <Row>
                                                                <Col>
                                                                    <div className="d-grid gap-2">
                                                                        <button onClick={openModal} className="btn4">Editar</button>
                                                                    </div>
                                                                </Col>

                                                                <Modal show={showModal} onHide={closeModal} >
                                                                    <Modal.Header closeButton>

                                                                        <Modal.Title>Editar</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <EditServiceForm  {...service} closeModal={closeModal} loadService={loadService} />
                                                                    </Modal.Body>
                                                                </Modal>
                                                                <Col>
                                                                    <div className="d-grid">
                                                                        <Link to="/">
                                                                            <button className="btn4" onClick={delOneServcice}>Eliminar</button >
                                                                        </Link>
                                                                    </div>

                                                                </Col>
                                                            </Row>

                                                        </>
                                                        :
                                                        <>

                                                            <Row>
                                                                <Col>
                                                                    <div className="d-grid gap-2">
                                                                        <button onClick={openModal} className="btn4">Contratar</button >
                                                                    </div>

                                                                    <Modal show={showModal} onHide={closeModal} >
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title className="nameServMod">Servicio</Modal.Title>
                                                                            <HireServiceForm owner={service.owner} loadService={loadService} closeModal={closeModal} />
                                                                        </Modal.Header>
                                                                    </Modal>
                                                                </Col>

                                                            </Row>
                                                        </>
                                                }
                                            </Container>
                                        </div>
                                    </Row>

                                </div>

                            </div>
                        </div>




                    </div>



                </div>
            }

        </Container>

    )
}


export default ServiceDetailsPage