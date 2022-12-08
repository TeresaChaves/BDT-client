import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import servicesService from "../../services/services.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"




function AddServiceForm({ fireFinalActions }) {

    const [serviceData, setDataService] = useState({
        name: "",
        description: "",
        image: "",
        totalHours: 0,

    })

    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setDataService({ ...serviceData, [name]: value })
    }

    const { name, description, image, } = serviceData

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

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="url" value={image} onChange={handleInputChange} name="image" />
                        </Form.Group>
                    </Col>
                </Row>
                {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}
                <div className="d-grid">
                    <Button variant="dark" type="submit">Crear Servicio</Button>
                </div>

            </Form>

        </div>
    )

}

export default AddServiceForm