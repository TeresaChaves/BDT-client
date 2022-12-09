import './ServiceCard.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth.context"
import servicesService from '../../services/services.service'
import { useState } from 'react'


function ServiceCard({ name, image, _id, owner }) {

    const [delService, setDeleteService] = useState()

    const delOneServcice = () => {
        servicesService
            .deleteService(_id)
            .then(({ data }) => setDeleteService(data))
            .catch(err => console.error(err))
    }

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
                                        <Link to={'/'}>
                                            <Button variant="danger" onClick={delOneServcice}>Eliminar</Button>
                                        </Link>
                                        <Link to={"/servicios/editar-servicio/:service_id"}>
                                            {/* <Button variant="warning" onClick={editOneService}>Editar</Button> */}
                                        </Link>
                                    </ButtonGroup>
                                </div>
                                <>
                                    <Link to={`/servicios/detalles/${_id}`}>
                                        <div className='d-grid'>
                                            <Button variant="success" size="sm">Ver detalles</Button>
                                        </div>
                                    </Link>
                                </>
                            </>
                    }

                </div>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;