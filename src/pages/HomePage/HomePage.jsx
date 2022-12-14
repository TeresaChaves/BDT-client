
import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom'


import './HomePage.css'
import SobreNosotros from "../../assests/images/SobreNosotros.jpg"
import TimeShare from "../../assests/images/ExampleBDT.jpg"
import Josiah from "../../assests/images/JosiahWarren.jpg"

import LottieComp from '../../components/Lottie/Lottie';



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
                <div className="container2"> <a href="#" class="button">
                    <div className="button__line"></div>
                    <div className="button__line"></div> <span class="button__text">ENTRAR</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                </a>
                    <LottieComp />
                </div>
            </Link>
            {/* 
            <div>
                <body className='somos'>
                    <div class="Iam">

                        <p>Somos</p>
                        <b>
                            <div class="innerIam">
                                TimeSearch<br />
                                tu banco de tiempo<br />
                                un sistema de intercambio de servicios<br />
                                una alternativa econ??mica social y sostenible<br />
                                colaboraci??n.
                            </div>
                        </b>

                    </div>
                </body>
            </div> */}






            <div class="container10">
                <h2 class="title10">
                    <span class="title-word title-word-1">TIME</span>
                    <span class="title-word title-word-2">SHARE</span>

                </h2>
            </div>
            <div class="container10">
                <h5 class="title10">
                    <span class="title-word title-word-3">TU</span>
                    <span class="title-word title-word-4">BANCO</span>
                    <span class="title-word title-word-4">DE</span>
                    <span class="title-word title-word-4">TIEMPO</span>
                </h5>


            </div>




            <Container >
                <div className="ExampleOrigin">

                    <Link onClick={handleShowHistory}>
                        <button className="btn2"> Or??genes
                        </button>
                    </Link>

                    <Link onClick={handleShowHowitWorks}>
                        <button className="btn2"> Ejemplo
                        </button>
                    </Link>

                </div>

                <Offcanvas show={showHistory} onHide={handleCloseHistory}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Todo empez??...</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <p className='offcanvasText'>
                            <p>
                                Aunque los antecedentes de los primeros intercambios sin mediaci??n econ??mica se remontan al origen mismo de la especie, tenemos algunos ejemplos m??s modernos de la aplicaci??n de esta idea.
                            </p>
                            <p>
                                Encontramos ejemplos de econom??a colaborativa en momentos hist??ricos tan dispares como la <b>Comuna de Par??s</b> , el <b> Cant??n de Cartagena</b> , o las agrupaciones guerrilleras de corte libertario del <b>valle de Ar??n</b>  a principios del siglo XX.
                            </p>
                            <p>
                                Sin embargo la inspiraci??n fundamental parte de los postulados de <b>Josiah Warren</b>  en Cincinnati a principios del s. XIX, ciudad en la que se fundaron los primeros bancos de tiempo modernos.
                            </p>
                            <figure>
                                <img src={Josiah} className="Josiah" alt="Josiah Warren" />
                                <figcaption className='figcaption'>Josiah Warren</figcaption>
                            </figure>
                            <p>
                                Pese a que los bancos de tiempo son una forma de organizaci??n ampliamente extendida entre asociaciones modernas, hasta donde sabemos, no ha habido muchos intentos de digitalizar el sistema.
                            </p>
                            <figure>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c6/Truck_system_of_payment_by_order_of_Robert_Owen_and_Benj_Woolfield%2C_July_22nd_1833_%281294620%29.jpg' className="Josiah" alt="Josiah Warren" />
                                <figcaption className='figcaption'>Primer billete de 2 horas del banco de tiempo de Cincinnati</figcaption>
                            </figure>

                            <p>
                                As?? nace TimeShare, aplicando a las experiencias exitosas del pasado la tecnolog??a de vanguardia para mejorar la vida de las sociedades modernas.
                            </p>
                        </p>



                    </Offcanvas.Body>
                </Offcanvas>

                <Offcanvas show={showHowitWorks} onHide={handleCloseHowitWorks} placement={'end'}>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <img src={TimeShare} className="picExample" alt="Como funciona" />
                    </Offcanvas.Body>
                </Offcanvas>


                <div>

                    <div class="card2">
                        <a href="https://www.linkedin.com/in/gonzalo-garcia-corrales-fullstack-web-developer/">
                            <p><span>gonzalo garc??a</span></p>
                        </a>
                        <a href=""><p > <img class="card3" src={SobreNosotros} alt="" /></p></a>
                        <a href="https://www.linkedin.com/in/teresachavesmaza/">
                            <p>
                                <span>Teresa Chaves</span>
                            </p>
                        </a>
                    </div>
                </div>




            </Container>

        </Container >
    )
}

export default HomePage