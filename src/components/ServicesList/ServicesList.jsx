import { Col, Row } from "react-bootstrap"
import ServiceCard from "../ServiceCard/ServiceCard"


const ServicesList = ({ services, loadServices }) => {

    return (

        <>

            <Row>
                {services.map(elm => {
                    return (
                        <Col sm={{ span: 4 }} key={elm._id} >
                            <ServiceCard {...elm} loadServices={loadServices} />
                        </Col>
                    )
                })}
            </Row>

        </>
    )
}

export default ServicesList