import "./ServicesListPage.css"
import { useState, useEffect, useContext } from "react"
import servicesService from "../../services/services.service"
import { Container, Button, Modal } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm"
// import Loader from "../../components/Loader/Loader"
import { MessageContext } from '../../contexts/userMessage.context'
import { AuthContext } from '../../contexts/auth.context'
import SearchBar from "../../components/SearchBar/SearchBar"
import SearchResults from "../../components/SearchResults/SearchResults"


const ServicesListPage = () => {

    const [services, setServices] = useState([])
    const [searchResults, setSearchResults] = useState([])
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
                setSearchResults(data)
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

                <div className="container3"> <a href="#" class="button">
                    <div className="button__line"></div>
                    <div className="button__line"></div> <span class="button__text">SERVICIOS</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                </a>
                    {/* <LottieComp /> */}
                    <div  >
                        {user && <button className="btn2" onClick={openModal} >Da de alta tu servicio</button>}

                    </div>
                </div>
                <SearchBar services={services} setSearchResults={setSearchResults} />
                <SearchResults searchResults={searchResults} loadServices={loadServices} />
                <br />
                <hr />
                <Link to="/">
                    <Button variant="dark" as="div">Volver a inicio</Button>
                </Link>
            </Container>
            <hr />

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