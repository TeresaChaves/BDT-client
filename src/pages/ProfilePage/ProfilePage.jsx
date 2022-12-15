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
                    <Col xxl={{ span: 4 }} className='profileCol'>
                        <img src={user.avatar} className="avatar" />
                    </Col>

                    <Col xxl={{ span: 8 }} className='profileCol'>
                        <h2 className="userName">{user.username} </h2>
                        <div className='hoursBalance'>

                            <h2>Tu saldo es:</h2>
                            <h3>{user.bankAccountTime} horas</h3>
                        </div>
                    </Col>
                </Row>
                <Row>

                    <h2>Servicios que ofreces</h2>

                    {user && <Button onClick={openModal} variant="success" size="sm" className='newServiceButton'>Crear nuevo servicio</Button>}
                    <ProfileServices profileServices={profileServices} />
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