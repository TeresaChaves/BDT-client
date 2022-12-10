import { useState } from 'react';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';

import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css'
import SobreNosotros from "../../assests/images/SobreNosotros.jpg"
import SearchBar from '../../components/SearchBar/SearchBar';


function HomePage() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [showHistory, setShowHistory] = useState(false);

    const handleCloseHistory = () => setShowHistory(false);
    const handleShowHistory = () => setShowHistory(true);

    const [showAboutUs, setShowAboutUs] = useState(false);

    const handleCloseAboutUs = () => setShowAboutUs(false);
    const handleShowAboutUs = () => setShowAboutUs(true);

    return (
        <Container fluid className='HomePage'>

            <Carousel activeIndex={index} onSelect={handleSelect} as="div" className='Hero' showControls fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Primera imagen</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Segunda imagen</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Tercera imagen</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <br />

            <Container>
                <Row>
                    <Col as="div" className='col1'>
                        <div className='bg-image'>
                            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c6/Truck_system_of_payment_by_order_of_Robert_Owen_and_Benj_Woolfield%2C_July_22nd_1833_%281294620%29.jpg' className='w-100' alt='Sample' />
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <Button variant="primary" onClick={handleShowHistory}>
                                        Historia del movimiento
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Offcanvas show={showHistory} onHide={handleCloseHistory}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Historia</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Banco de tiempo.
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Col as="div" className='col2'>
                        <div className='bg-image'>
                            <img src='https://thumbs.dreamstime.com/b/services-concept-flat-line-design-icons-elements-modern-services-concept-s-collection-services-concept-lettering-thin-68961333.jpg' className='w-100' alt='Sample' />
                            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <h3 className='text-white mb-0'>Ver todos los servicios</h3>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col as="div" className='col3'>
                        <div className='bg-image'>
                            <img src={SobreNosotros} className='w-100' alt='Sample' />
                            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <Button variant="primary" onClick={handleShowAboutUs}>
                                        Sobre nosotros
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Offcanvas show={showAboutUs} onHide={handleCloseAboutUs} placement={'end'}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Sobre nosotros</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Nosotros somos muy grandes
                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>
            </Container>
            <br />
            <br />
        </Container>
    )
}

export default HomePage