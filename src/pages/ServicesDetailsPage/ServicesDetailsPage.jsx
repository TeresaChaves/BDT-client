import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import EditServiceForm from "../../components/EditServiceForm/EditServiceForm"
import Loader from "../../components/Loader/Loader"
import HireServiceForm from "../../components/HireServiceForm/HireServiceForm"


function ServiceDetailsPage() {
    const { service_id } = useParams()
    const [service, setService] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadService()
    }, [])

    const loadService = () => {
        servicesService
            .getOneService(service_id)
            .then(({ data }) => setService(data))
            .catch(err => console.error(err))
    }

    // const { name, description } = service

    return (

        <Container>
            {!service ? <Loader />
                :
                <Row>
                    <div>
                        <h3>{service.name}</h3>
                    </div>
                    <Col md={{ span: 6, offset: 1 }}>
                        <p>{service.description}</p>
                        <ul>
                            <li>Horas: {service.totalhours}</li>
                        </ul>
                        <hr />

                        <Container>
                            {
                                service.owner == user?._id
                                    ?
                                    <>
                                        <Button onClick={openModal} variant="dark">editar</Button>
                                        <hr />

                                        <Modal show={showModal} onHide={closeModal} >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Editar</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <EditServiceForm  {...service} closeModal={closeModal} loadService={loadService} />
                                            </Modal.Body>
                                        </Modal>

                                        <Link to="/">
                                            <Button variant="dark" as="div">Volver a inicio</Button>
                                        </Link>

                                        {/* <Link to="/servicios/contratar/:service_id">
                                            <Button as="div" variant="dark">Contratar</Button>
                                        </Link> */}
                                        <hr />
                                    </>
                                    :
                                    <>
                                        <Link to="/">
                                            <Button variant="dark" as="div">Volver a inicio</Button>
                                        </Link>


                                        <Button onClick={openModal} variant="dark">contratar</Button>

                                        <Modal show={showModal} onHide={closeModal} >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Servicio</Modal.Title>
                                                <HireServiceForm />
                                            </Modal.Header>
                                        </Modal>


                                    </>

                            }



                        </Container>

                    </Col>

                    <Col md={{ span: 4 }}>
                        <img src={service.image} style={{ width: '100%' }} />
                    </Col>

                </Row>
            }

        </Container>

    )
}


export default ServiceDetailsPage