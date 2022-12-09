import './ServiceCard.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"
import { useContext } from 'react';



import { AuthContext } from "../../contexts/auth.context"

function ServiceCard({ name, image, _id, owner }) {

    const { user } = useContext(AuthContext)
    return (
        <Card className="mb-4 ServiceCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div className='d-grid'>


                    {
                        !owner || owner != user?._id
                            ?
                            <>
                                <Link to={`/servicios/detalles/${_id}`}>
                                    <div className='d-grid'>
                                        <Button variant="success" size="sm">Ver detalles</Button>
                                    </div>
                                </Link>
                            </>
                            :
                            <>
                                <div className='d-grid'>
                                    <ButtonGroup aria-label="Basic example" size="sm">
                                        <Link to={`/servicios/detalles/${_id}`}>

                                            <Button variant="success">Ver detalles</Button>
                                        </Link>
                                        <Link to={`/edit-service/service/${_id}`}>
                                            <Button variant="warning">Editar</Button>
                                        </Link>
                                    </ButtonGroup>
                                </div>
                            </>

                    }

                </div>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;