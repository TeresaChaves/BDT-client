import { Container, Row, Col } from 'react-bootstrap'
import HireServiceForm from '../../components/HireServiceForm/HireServiceForm'


const HireServicePage = () => {
    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Acceder</h1>
                    <hr />
                    <HireServiceForm />
                </Col>
            </Row>
        </Container>
    )

}

export default HireServicePage