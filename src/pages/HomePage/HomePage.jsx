import { useState } from 'react';
import { Container, Row, Col, Form, Button, Stack, Card } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom'


import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css'
import SobreNosotros from "../../assests/images/SobreNosotros.jpg"
import SearchBar from '../../components/SearchBar/SearchBar';
import pictureExample from "../../assests/images/example.jpg"
import Josiah from "../../assests/images/JosiahWarren.jpg"
import Gon from "../../assests/images/Gon.jpg"


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

    const [showHowitWorks, setShowHowitWorks] = useState(false);

    const handleCloseHowitWorks = () => setShowHowitWorks(false);
    const handleShowHowitWorks = () => setShowHowitWorks(true);

    return (
        <Container fluid className='HomePage'>
            <Carousel activeIndex={index} onSelect={handleSelect} as="div" className='Hero' showcontrols variant='dark'>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://res.cloudinary.com/dlt2cjtvj/image/upload/v1671033332/que_necesitas_vv8x3j.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption >
                        <h3 className='heroText'>¿Qué necesitas?</h3>
                        <p className='heroText'>Elige entre los servicios que los usuarios ponen a tu disposición</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://res.cloudinary.com/dlt2cjtvj/image/upload/v1671033332/que_ofreces_jg5ez3.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className='heroText'>¿Qué ofreces?</h3>
                        <p className='heroText'>Pon tus habilidades a disposición de tu comunidad</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 heroImage"
                        src="https://res.cloudinary.com/dlt2cjtvj/image/upload/v1671033332/comparte_misvfo.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className='heroText'>¡Comparte!</h3>
                        <p className='heroText'>Participa en una economía colavoratiba basada en el tiempo</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <br />

            <Container>
                <Row className='row'>
                    <Col as="div">
                        <Link onClick={handleShowHistory}>
                            <Card className="bg-dark text-white mb-4 ">
                                <Card.Img src='https://upload.wikimedia.org/wikipedia/commons/c/c6/Truck_system_of_payment_by_order_of_Robert_Owen_and_Benj_Woolfield%2C_July_22nd_1833_%281294620%29.jpg' />
                                <Card.ImgOverlay className='homePageCardsMask'>
                                    <Card.Title className='homePageCardsTitle'>Historia del movimiento</Card.Title>
                                    <Card.Text className='homePageCardsText'>
                                        Descubre la historia de una economía diferente
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>

                    <Offcanvas show={showHistory} onHide={handleCloseHistory}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Todo empezó...</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <p className='offcanvasText'>What is Lorem Ipsum?
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <figure>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c6/Truck_system_of_payment_by_order_of_Robert_Owen_and_Benj_Woolfield%2C_July_22nd_1833_%281294620%29.jpg' className="Josiah" alt="Josiah Warren" />
                                <figcaption className='figcaption'>Primer billete de 2 horas</figcaption>
                            </figure>
                            <p>
                                Why do we use it?
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </p>
                            <figure>
                                <img src={Josiah} className="Josiah" alt="Josiah Warren" />
                                <figcaption className='figcaption'>Josiah Warren</figcaption>
                            </figure>

                        </Offcanvas.Body>
                    </Offcanvas>


                    <Col as="div">
                        {/* <div className='bg-image'>
                            <img src={SobreNosotros} className='w-50' alt='Sample' />
                            <div className='mask'>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <Button variant="primary" onClick={handleShowAboutUs}>
                                        ¿Quienes somos?
                                    </Button>
                                </div>
                            </div>
                        </div> */}
                    </Col>

                    <Offcanvas show={showAboutUs} onHide={handleCloseAboutUs} placement={'bottom'} className="aboutUs">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Sobre nosotros</Offcanvas.Title>

                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <p>Prueba</p>
                            <Row>
                                <Col>
                                    <img src={Gon} className="profilePictures" />
                                </Col>
                                <Col>
                                    <img src="https://d1hbpr09pwz0sk.cloudfront.net/profile_pic/teresa-chaves-maza-341494be.jpg" className="profilePictures" />
                                </Col>
                            </Row>
                        </Offcanvas.Body>
                    </Offcanvas>


                    <Col as="div">

                        <Link onClick={handleShowHowitWorks}>
                            <Card className="bg-dark text-white mb-4">
                                <Card.Img src='https://images.unsplash.com/photo-1575197478864-c83e1d2a4443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' />
                                <Card.ImgOverlay className='homePageCardsMask'>
                                    <Card.Title className='homePageCardsTitle'>¿Cómo funciona el banco?</Card.Title>
                                    <Card.Text className='homePageCardsText'>
                                        Dí adios al dinero
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>

                    </Col>

                    <Offcanvas show={showHowitWorks} onHide={handleCloseHowitWorks} placement={'end'}>
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <img src={pictureExample} className="picExample" alt="Como funciona" />

                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>
            </Container>
        </Container>
    )
}

export default HomePage