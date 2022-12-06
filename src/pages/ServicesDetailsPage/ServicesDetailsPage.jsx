import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useEffect, useState } from "react"


function ServiceDetailsPage() {

    const { service_id } = useParams()
    const [service, setService] = useState()


    useEffect(() => {
        servicesService
            .getOneService(service_id)
            .then(({ data }) => setService(data))
            .catch(err => console.error(err))
    }, [])


    return (
        <Container>
            {!service ? <h1>Loading</h1>
                :
                <Row>
                    <div>
                        <h3>Soy los detalles de {service.name}</h3>
                    </div>
                    <Col md={{ span: 6, offset: 1 }}>
                        <p>{service.description}</p>
                        <ul>
                            <li>Horas: {service.totalhours}</li>
                        </ul>
                        <hr />
                        <Link to="/servicios">
                            <Button as="div" variant="dark">Volver a la servicios</Button>
                        </Link>
                        <br />
                        <br />
                        <Link to="/servicios/contratar/:service_id">
                            <Button as="div" variant="dark">Contratar</Button>
                        </Link>

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