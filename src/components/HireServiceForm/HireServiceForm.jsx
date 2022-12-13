import { useState } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap"
// import RangeSlider from 'react-bootstrap-range-slider'
// import servicesService from "../../services/services.service"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import uploadUsers from "../../services/users.service"


function HireServiceForm({ owner }) {

    const [hours, setHours] = useState(0)

    const handleInputChange = e => {
        setHours(e.target.value)
    }


    //     const [service, setService] = useState({

    e.preventDefault()

    const bankAccountTime = { hours }


    uploadUsers
        .updateUser(owner, bankAccountTime)
        .then((res) => {
            console.log(res)
        })
    // .catch(err => setErrors(err.response.data.errorMessages))
}

return (
    <div>
        <Form onSubmit={handleFormSubmit}>
            <Form.Label>bankAccountTime</Form.Label>
            <Form.Control type="number" value={hours} onChange={handleInputChange} name="bankAccountTime" />
            <Button variant="dark" type="submit">Contratar</Button>

//             </Form>


    </div>

)
}
export default HireServiceForm