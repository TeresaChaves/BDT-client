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
    console.log('estara ya el owner???', service)
    // const { name, description } = service

    return (

        <Container>
            {!service ? <Loader />
                :
                <Row className="detailMargin">

                    <Col md={{ span: 6, offset: 1 }}>

                        <h3 className="nameDetail">{service.name}</h3>

                        <h4 className="descriptionDetail"> {service.description}</h4>
                        <p><b><a className="mailToOwner" href={`mailto:${service.owner.email}`}>Email</a></b></p>



                        <hr />

                        <Container>
                            {
                                service.owner == user?._id
                                    ?
                                    <>
                                        <Row>
                                            <Col>
                                                <div className="d-grid gap-2">
                                                    <Button onClick={openModal} variant="dark">Editar</Button>
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

                                                <Link to="/">
                                                    <div className="d-grid gap-2">
                                                        <Button variant="dark" as="div">Volver a inicio</Button>
                                                    </div>
                                                </Link>

                                            </Col>
                                        </Row>

                                    </>
                                    :
                                    <>
                                        <Row>
                                            <Col>
                                                <Link to="/">
                                                    <div className="d-grid gap-2">
                                                        <Button variant="dark" as="div">Volver a inicio</Button>
                                                    </div>
                                                </Link>
                                            </Col>

                                            <Col>
                                                <div className="d-grid gap-2">
                                                    <Button onClick={openModal} variant="dark">Contratar</Button>
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
                    </Col>
                    <Col md={{ span: 4 }}>
                        <img className="detailPhoto" src={service.image} style={{ width: '100%' }} />
                    </Col>

                </Row>
            }

        </Container>

    )
}


export default ServiceDetailsPage