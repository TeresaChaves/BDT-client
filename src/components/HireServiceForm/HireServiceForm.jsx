import { useEffect, useState } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap"
// import RangeSlider from 'react-bootstrap-range-slider'
// import servicesService from "../../services/services.service"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import uploadHours from "../../services/hours.service"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from '../../contexts/userMessage.context'
import './HireServiceForm.css'



function HireServiceForm({ owner, loadService, closeModal }) {

    const [hours, setHours] = useState(0)
    const [availableHours, setAvailableHours] = useState(0)
    const { user } = useContext(AuthContext)


    const { setShowToast, setToastMessage } = useContext(MessageContext)

    useEffect(() => {
        uploadHours
            .getAvailableHours(user?._id)
            .then(({ data }) => setAvailableHours(data))
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        setHours(e.target.value)
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage("Has contratado el servicio")
        loadService()
        closeModal()
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        uploadHours
            .updateHours(owner._id, hours)
            .then(() => {
                fireFinalActions()

            })
            .catch(res => {
                console.log(res)
                closeModal()
                setShowToast(true)
                setToastMessage('Ha ocurrido un problema')
            })

    }

    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <Row>

                    <Form.Label>¿Cuanto tiempo necesitas?</Form.Label>
                </Row>
                <Row>
                    <Col>
                        <h5>Te quedan {availableHours} horas</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5> Estás solicitando {hours} horas</h5>
                    </Col>
                </Row>
                <Form.Control type="number" value={hours} onChange={handleInputChange} name="bankAccountTime" min={0} max={availableHours} />
                <div className="buttonContract">
                    <Button variant="dark" type="submit">Contratar</Button>
                </div>
            </Form>
        </div>

    )
}
export default HireServiceForm