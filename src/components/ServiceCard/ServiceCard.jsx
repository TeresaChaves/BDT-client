import './ServiceCard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

function ServiceCard({ name, image, _id }) {
    return (
        <Card className="mb-4 ServiceCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div className='d-grid'>
                    <Link to={`/servicios/detalles/${_id}`}>
                        <Button variant="success" size="sm">Ver detalles</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;