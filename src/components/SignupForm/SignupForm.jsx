import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from '../../contexts/userMessage.context'
import authService from "../../services/auth.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import uploadServices from "../../services/upload.service"


const SignupForm = () => {

    const [loadingImage, setLoadingImage] = useState(false)

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    })
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                setShowToast(true)
                setToastMessage('Usuario creado correctamente')
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])
        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, avatar: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }


    const { username, password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>
                </Col>
            </Row>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>
            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}


            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : "Registrar"}</Button>
            </div>


        </Form>
    )
}

export default SignupForm