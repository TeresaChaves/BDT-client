import ServiceCard from "../ServiceCard/ServiceCard"
import { Col, Row } from "react-bootstrap"
import servicesService from "../../services/services.service"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"



function ProfileServices({ profileServices }) {




    // const mapOwner = profileServices.map(elm => elm.owner)

    // const { user } = useContext(AuthContext)





    // const resultsArray = services.filter(service => service.onwer)
    // console.log ()
    // setServices(resultsArray)


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


        </>
    )



}

export default ProfileServices
