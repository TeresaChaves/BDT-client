import './ProfilePage.css'
import servicesService from "../../services/services.service"
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm"
import { AuthContext } from "../../contexts/auth.context"
import { useState, useContext, useEffect } from 'react';
import { MessageContext } from '../../contexts/userMessage.context'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ProfileServices from '../../components/ProfileServices/ProfileServices';


function ProfilePage() {

    const [services, setServices] = useState([])
    const [profileServices, setprofileServices] = useState([])


    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => {
                setServices(data)
                setprofileServices(data)
            })
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage("Nuevo servicio creado")
        closeModal()
        loadServices()
    }




    return (
        <>
            <Container>

                <Row>
                    <Col md={{ span: 4 }}>
                        <img src={user.avatar} className="avatar" />
                    </Col>

                    <Col md={{ span: 8 }}>
                        <h2 className="userName">{user.username} </h2>
                        <hr />
                        <h2>Mis servicios</h2>
                        {user && <Button onClick={openModal} variant="dark" size="sm">Crear nuevo servicio</Button>}

                        <ProfileServices profileServices={profileServices} />

                    </Col>

                </Row>
            </Container >

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

export default ProfilePage