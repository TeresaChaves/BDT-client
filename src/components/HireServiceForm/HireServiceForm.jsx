import { useState } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider'
import servicesService from "../../services/services.service"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


function HireServiceForm({ fireFinalActions }) {

    const [serviceData, setDataService] = useState({

        serviceDuration: "",
        serviceDate: "",
    })

    const [errors, setErrors] = useState(null)

    const [minutes, setMinutes] = useState(15)

    const handleInputChange = e => {
        const { name, value } = e.target
        setDataService({ ...serviceData, [name]: value })
    }

    const { serviceDuration, serviceDate, } = serviceData

    const handleFormSubmit = e => {

        e.preventDefault()
        servicesService
            .saveService(serviceData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (
        <div>
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="serviceDate">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" value={serviceDate} onChange={handleInputChange} name="serviceDate" />

                    <br />

                </Form.Group>

                <Form.Group className="mb-3" controlId="serviceDuration" as={Row}>
                    <Form.Label>Duración del servicio (minutos)</Form.Label>
                    <Col xs="9">
                        <RangeSlider
                            value={minutes}
                            onChange={e => setMinutes(e.target.value)}
                            tooltipLabel={currentValue => `${currentValue} minutos`}
                            variant='success'
                            min={15}
                            max={120}
                            step={15}
                        />
                    </Col>
                    <Col xs="3">
                        <Form.Control value={minutes} /> <p>Minutos</p>
                    </Col>
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Contratar Servicio</Button>
                </div>

            </Form>

        </div>
    )
}

export default HireServiceForm