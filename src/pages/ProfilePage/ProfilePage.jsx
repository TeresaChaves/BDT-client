import './ProfilePage.css'
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap';

function ProfilePage({ signupData }) {

    const { user } = useContext(AuthContext)

    return (
        <>
            <div >
                <Card style={{ width: '18rem' }} className="profileCard">
                    <Card.Img variant="top" src={user.avatar} className="avatar" />
                    <Card.Body>
                        <Card.Title className="mb-3 text-center"><h3>{user.username}</h3></Card.Title>
                        <hr />
                        <Card.Subtitle className="mb-3">
                            <Button variant="Light" >
                                Mi tiempo para consumir es:
                                <Badge bg="secondary" className="mt-3">{user.bankAccountTime = 0}</Badge>
                            </Button>
                        </Card.Subtitle>
                        <div className="d-grid gap-2">
                            <Link to="/servicios" >
                                <Button variant="dark" size="lg">Ir a los servicios</Button>
                            </Link>

                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>
    )


}

export default ProfilePage