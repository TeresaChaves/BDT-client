import ServiceCard from "../ServiceCard/ServiceCard"
import { Col, Row } from "react-bootstrap"



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

                        <Col sm={{ span: 6 }} key={elm._id} >
                            <ServiceCard {...elm} profileServices={profileServices} />
                        </Col>

                    )
                })}
            </Row>


        </>
    )



}

export default ProfileServices
