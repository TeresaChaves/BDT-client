import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import servicesService from "../../services/services.service"
import uploadServices from "../../services/upload.service"
// import ErrorMessage from "../ErrorMessage/ErrorMessage"


function EditServiceForm({ _id, name, description, image, closeModal, loadService }) {

    const [editServ, setEditService] = useState({
        name: name,
        description: description,
        image: image,
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setEditService({ ...editServ, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])
        uploadServices
            .uploadimage(formData)
            .then(res => {
                setEditService({ ...editServ, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        servicesService
            .editService(_id, editServ)
            .then(() => {
                loadService()
                closeModal()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (
        <div>
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={editServ.name} onChange={handleInputChange} name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" value={editServ.description} onChange={handleInputChange} name="description" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>
                    </Col>
                </Row>
                {/* {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined} */}
                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Creando'}Crear Servicio</Button>
                </div>

            </Form>

        </div>
    )

}

export default EditServiceForm