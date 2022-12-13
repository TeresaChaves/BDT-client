import './ProfilePage.css'
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import servicesService from "../../services/services.service"

function ProfilePage() {


    const { user } = useContext(AuthContext)



    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <img src={user.avatar} className="avatar" />
                </Col>

                <Col md={{ span: 8 }}>
                    <h2 className="userName">{user.username} </h2>
                    <hr />
                    <h2>Mis servicios</h2>

                </Col>

            </Row>
        </Container >

    )


}

export default ProfilePage