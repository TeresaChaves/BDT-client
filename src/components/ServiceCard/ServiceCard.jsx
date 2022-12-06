import './ServiceCard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ServiceCard({ name, image, _id }) {
    return (
        <Card className="mb-4 ServiceCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div className='d-grid'>
                    <Button variant="success" size="sm">Ver detalles</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;