import { useState, useEffect, useContext } from "react"
import ServicesList from "../../components/ServicesList/ServicesList"
import servicesService from "../../services/services.service"
import { Container, Button, Modal } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm"
const ServicesListPage = () => {

    const [services, setServices] = useState([])
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const refreshPages = () => {
        servicesService
            .getServices()
            .then(({ data }) => setServices(data))
            .catch(err => console.log(err))

    }


    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => setServices(data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        loadServices()
    }, [])

    return (
        <>



            <Container>
                <h1>TODOS LOS SERVICIOS</h1>
                <Button onClick={openModal} variant="dark" size="sm">Crear nueva</Button>
                <hr />
                {!services ? <h1>Cargando...</h1> : <ServicesList services={services} />}
                <hr />
                <Link to="/">
                    <Button variant="dark" as="div">Volver a inicio</Button>
                </Link>

            </Container>

            <Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddServiceForm closeModal={closeModal} refreshPages={refreshPages} />
                </Modal.Body>

            </Modal>

        </>


    )
}

export default ServicesListPage