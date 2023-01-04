import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'



const LoginPage = () => {

    return (

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <div className="container3"> <a href="#" class="button">
                        <div className="button__line"></div>
                        <div className="button__line"></div> <span class="button__text">LOG IN</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>

                    </div>



                    <hr />

                    <LoginForm />

                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage