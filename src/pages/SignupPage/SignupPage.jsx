import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <div className="container3"> <a href="#" class="button">
                        <div className="button__line"></div>
                        <div className="button__line"></div> <span class="button__text">REGISTRO</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>

                    </div>



                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage