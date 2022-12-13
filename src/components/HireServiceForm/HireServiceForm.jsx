import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap"
// import RangeSlider from 'react-bootstrap-range-slider'
// import servicesService from "../../services/services.service"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import uploadUsers from "../../services/users.service"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"


function HireServiceForm({ owner }) {

    const [hours, setHours] = useState(0)

    const handleInputChange = e => {
        setHours(e.target.value)

    }

    const bankAccountTime = { hours }

    const { user } = useContext(AuthContext)
    console.log("que tiene el user", user.bankAccountTime)

    const handleFormSubmit = e => {

        e.preventDefault()
        uploadUsers
            .updateUser(owner, bankAccountTime)
            .then((res) => {
                console.log(res)
            })

        // .catch(err => setErrors(err.response.data.errorMessages))

    }

    return (
        <div>
            <Container>
                {


                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>bankAccountTime</Form.Label>
                        <Form.Control type="number" value={hours} onChange={handleInputChange} name="bankAccountTime" />
                        <Button variant="dark" type="submit">Contratar</Button>

                    </Form>


                }
            </Container>
        </div>

    )
}
export default HireServiceForm