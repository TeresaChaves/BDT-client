import ServiceCard from "../ServiceCard/ServiceCard"
import { Col, Row } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"



function ProfileServices({ profileServices }) {

    const [services, setServices] = useState([])
    const { user } = useContext(AuthContext)


    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => {
                setServices(data)

            })
            .catch(err => console.log(err))
        console.log(user._id)
    }


    return (
        <>
            <Row>
                {profileServices.map(elm => {
                    return (
                        <Col sm={{ span: 4 }} key={elm._id} >
                            <ServiceCard {...elm} profileServices={profileServices} />
                        </Col>
                    )
                })}
            </Row>
            :
            <article><p>Aún no has creado ningún servicio</p></article>

            {/* {searchResults?.length ?
                <Row>
                    {searchResults.map(elm => {
                        return (
                            <Col sm={{ span: 4 }} key={elm._id} >
                                <ServiceCard {...elm} searchResults={searchResults} />
                            </Col>
                        )
                    })}
                </Row>
                :
                <article><p>Aún no has creado ningún servicio</p></article>
            } */}

            <div>
                <h1>
                    ¿Hola?
                    {services.name}
                </h1>
            </div>
        </>
    )



}

export default ProfileServices
