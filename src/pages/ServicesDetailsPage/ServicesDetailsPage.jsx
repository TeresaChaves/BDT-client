import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import HireServiceForm from "../../components/HireServiceForm/HireServiceForm"


function ServiceDetailsPage() {

    const { service_id } = useParams()
    const [service, setService] = useState()
    const [showModal, setShowModal] = useState(false)


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)


    useEffect(() => {
        servicesService
            .getOneService(service_id)
            .then(({ data }) => setService(data))
            .catch(err => console.error(err))
    }, [])


    return (
        <>
            <Container>
                {!service ? <Loader />
                    :
                    <Row>
                        <div>
                            <h3>{service.name}</h3>
                        </div>
                        <Col md={{ span: 6, offset: 1 }}>
                            <p>{service.description}</p>
                            {/* <ul>
                                <li>Horas: {service.totalhours}</li>
                            </ul>
                            <hr /> */}
                            <Link to="/servicios">
                                <Button as="div" variant="dark">Volver a la servicios</Button>
                            </Link>
                            <br />
                            <br />
                            {/* <Link to="/servicios/contratar/:service_id">
                                <Button as="div" variant="dark">Contratar</Button>
                            </Link> */}
                            <Button onClick={openModal} variant="success" >Contratar</Button>


                        </Col>
                        <Col md={{ span: 4 }}>
                            <img src={service.image} style={{ width: '100%' }} />
                        </Col>

                    </Row>
                }

            </Container>

            <Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Servicio</Modal.Title>
                    <HireServiceForm />
                </Modal.Header>
            </Modal>
        </>
    )
}

export default ServiceDetailsPage