import { useEffect, useState } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap"
// import RangeSlider from 'react-bootstrap-range-slider'
// import servicesService from "../../services/services.service"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import uploadUsers from "../../services/users.service"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"



function HireServiceForm({ owner }) {

    const [hours, setHours] = useState(0)
    const [availableHours, setAvailableHours] = useState(0)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        uploadUsers
            .getAvailableHours(user._id)
            .then(({ data }) => setAvailableHours(data))
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        setHours(e.target.value)
    }

    const handleFormSubmit = e => {

        e.preventDefault()
        uploadUsers
            .updateUser(owner, hours)
            .then((res) => {
                console.log('que nos llega aquii????', res)
            })

        // .catch(err => setErrors(err.response.data.errorMessages))

    }


    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <Form.Label>¿Cuanto tiempo necesitas?</Form.Label>
                <p>Te quedan {availableHours} horas disponibles, estás solicitando {hours} horas</p>
                <Form.Control type="number" value={hours} onChange={handleInputChange} name="bankAccountTime" min={0} max={availableHours} />
                <Button variant="dark" type="submit">Contratar</Button>

            </Form>
        </div>

    )
}
export default HireServiceForm