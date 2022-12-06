import { useState, useEffect, useContext } from "react"
import ServicesList from "../../components/ServicesList/ServicesList"
import servicesService from "../../services/services.service"
import { Container, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const ServicesListPage = () => {

    const [services, setServices] = useState([])


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

        <Container>
            <h1>TODOS LOS SERVICIOS</h1>
            <hr />
            {!services ? <h1>Cargando...</h1> : <ServicesList services={services} />}
            <hr />
            <Link to="/">
                <Button variant="dark" as="div">Volver a inicio</Button>
            </Link>

        </Container>


    )
}

export default ServicesListPage