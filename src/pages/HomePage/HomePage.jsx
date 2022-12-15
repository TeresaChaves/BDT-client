import { useState } from 'react';
import { Container, Row, Col, Form, Button, Stack, Card, Popover } from 'react-bootstrap'
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
            <Link to={"/servicios"}>
                <Carousel as="div" className='Hero'>
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

            </Link>



            <Container>
                <Row className='row'>
                    <Col as="div">
                        <Link onClick={handleShowHistory}>
                            <Card className='homePageCard'>
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
                            <p className='offcanvasText'>
                                <p>
                                    Aunque los antecedentes de los primeros intercambios sin mediación económica se remontan al origen mismo de la especie, tenemos algunos ejemplos más modernos de la aplicación de esta idea.
                                </p>
                                <p>
                                    Encontramos ejemplos de economía colaborativa en momentos históricos tan dispares como la <b>Comuna de París</b> , el <b> Cantón de Cartagena</b> , o las agrupaciones guerrilleras de corte libertario del <b>valle de Arán</b>  a principios del siglo XX.
                                </p>
                                <p>
                                    Sin embargo la inspiración fundamental parte de los postulados de <b>Josiah Warren</b>  en Cincinnati a principios del s. XIX, ciudad en la que se fundaron los primeros bancos de tiempo modernos.
                                </p>
                                <figure>
                                    <img src={Josiah} className="Josiah" alt="Josiah Warren" />
                                    <figcaption className='figcaption'>Josiah Warren</figcaption>
                                </figure>
                                <p>
                                    Pese a que los bancos de tiempo son una forma de organización ampliamente extendida entre asociaciones modernas, hasta donde sabemos, no ha habido muchos intentos de digitalizar el sistema.
                                </p>
                                <figure>
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c6/Truck_system_of_payment_by_order_of_Robert_Owen_and_Benj_Woolfield%2C_July_22nd_1833_%281294620%29.jpg' className="Josiah" alt="Josiah Warren" />
                                    <figcaption className='figcaption'>Primer billete de 2 horas del banco de tiempo de Cincinnati</figcaption>
                                </figure>

                                <p>
                                    Así nace TimeShare, aplicando a las experiencias exitosas del pasado la tecnología de vanguardia para mejorar la vida de las sociedades modernas.
                                </p>
                            </p>






                        </Offcanvas.Body>
                    </Offcanvas>


                    {/* <Col as="div">
                        <Link onClick={handleShowAboutUs}>
                            <Card className='homePageCard'>
                                <Card.Img src={SobreNosotros} className="aboutUsPicture" />
                                <Card.ImgOverlay className='homePageCardsMask'>
                                    <Card.Title className='homePageCardsTitle'>Sobre nosotros</Card.Title>
                                    <Card.Text className='homePageCardsText'>
                                        Acerca de los creadores
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col> */}

                    <Offcanvas show={showAboutUs} onHide={handleCloseAboutUs} placement={'bottom'} className="aboutUs">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Sobre nosotros</Offcanvas.Title>

                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Row>
                                <Col sm={{ span: 2 }}>
                                    <h5>Gonzalo García</h5>
                                    <img src={Gon} className="profilePictures" />
                                </Col>
                                <Col>
                                    <p className='aboutUsDescription'>
                                        Apasionado de la filosofía y las ciencias políticas, Gonzalo siempre está intentando aportar a su comunidad creando nuevas formas de organización social más justas y eficientes.
                                    </p>
                                </Col>
                                <Col sm={{ span: 2 }}>
                                    <h5>Teresa Chaves</h5>
                                    <img src="https://d1hbpr09pwz0sk.cloudfront.net/profile_pic/teresa-chaves-maza-341494be.jpg" className="profilePictures" />
                                </Col>
                                <Col>
                                    <p>
                                        Texto de descripción
                                    </p>
                                </Col>
                            </Row>
                        </Offcanvas.Body>
                    </Offcanvas>


                    <Col as="div">
                        <Link onClick={handleShowHowitWorks}>
                            <Card className='homePageCard'>
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
                <Row>
                    <Col md={5}>
                        <Card>
                            <a className='linkedInLink' href="https://www.linkedin.com/in/gonzalo-garcia-corrales-fullstack-web-developer/">
                                <Card.Title className='homeCardTitle'>Gonzalo García</Card.Title>
                            </a>
                        </Card>

                    </Col>
                    <Col md={2}>
                        <img className='aboutUSnew' src={SobreNosotros} alt="" />
                    </Col>
                    <Col md={5}>

                        <Card>
                            <a className='linkedInLink' href="https://www.linkedin.com/in/teresachavesmaza/">

                                <Card.Title className='homeCardTitle'>Teresa Chaves</Card.Title>
                            </a>
                        </Card>
                    </Col>

                </Row>
            </Container>

        </Container >
    )
}

export default HomePage