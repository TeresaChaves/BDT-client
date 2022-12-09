import { useState, useEffect, useContext } from "react"
import ServicesList from "../../components/ServicesList/ServicesList"
import servicesService from "../../services/services.service"
import { Container, Button, Modal } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm"
import Loader from "../../components/Loader/Loader"
import { MessageContext } from '../../contexts/userMessage.context'
import { AuthContext } from '../../contexts/auth.context'


const ServicesListPage = () => {

    const [services, setServices] = useState([])
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)

    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => setServices(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage("Nuevo servicio creado")
        closeModal()
        loadServices()
    }

    useEffect(() => {
        loadServices()
    }, [])

    return (
        <>

            <Container>
                <h2>Servicios</h2>
                {user && <Button onClick={openModal} variant="dark" size="sm">Crear nueva</Button>}
                <hr />
                {!services ? <Loader /> : <ServicesList services={services} loadServices={loadServices} />}
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
                    <AddServiceForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>


        </>

    )
}

export default ServicesListPage