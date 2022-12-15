import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import servicesService from "../../services/services.service"
import uploadServices from "../../services/upload.service"
import capitalize from "../../utils/capitalize"
import ErrorMessage from "../ErrorMessage/ErrorMessage"


function AddServiceForm({ fireFinalActions }) {

    const [serviceData, setDataService] = useState({
        name: "",
        description: "",
        image: "",
        disponibility: "",
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setDataService({ ...serviceData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])
        uploadServices
            .uploadimage(formData)
            .then(res => {
                setDataService({ ...serviceData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }
    const { name, description, disponibility } = serviceData

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
                    <Form.Label class="text-capitalize">Nombre</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="disponibility">
                    <Form.Label>Disponibilidad</Form.Label>
                    <Form.Control type="text" value={disponibility} onChange={handleInputChange} name="disponibility" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>
                    </Col>
                </Row>
                {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}
                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : "Crear Servicio"}</Button>
                </div>

            </Form>

        </div>
    )

}

export default AddServiceForm