import './ProfilePage.css'
import servicesService from "../../services/services.service"
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm"
import { AuthContext } from "../../contexts/auth.context"
import { useState, useContext, useEffect } from 'react';
import { MessageContext } from '../../contexts/userMessage.context'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ProfileServices from '../../components/ProfileServices/ProfileServices';


function ProfilePage() {

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
            .getServices(user._id)
            .then(({ data }) => {
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
                <Row className='profileRow'>
                    <Col sm={3} className='profileCol'>
                        <h2 className="userName">{user.username} </h2>
                        <img src={user.avatar} className="avatar" />
                    </Col>
                    <Col>
                        <h5 className='textYourAccount'>Saldo:</h5>
                        <h1 className='numberProf'>{user.bankAccountTime} horas</h1>
                    </Col>

                    <Col className='profileCol'>
                    </Col>
                    <Row className='cardMarg'>
                        <Col sm={3} >
                        </Col>
                        <Col className='profCOl'>
                            {user && <Button onClick={openModal} variant="success" size="sm" className='newServiceButton'>Crear nuevo servicio</Button>}
                            <h5 className="texServOffer">Servicios que ofreces</h5>
                            <ProfileServices profileServices={profileServices} />
                        </Col>
                    </Row>
                </Row>
                <Row>



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