import "./ServicesListPage.css";
import { useState, useEffect, useContext } from "react";
import servicesService from "../../services/services.service";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
// import Loader from "../../components/Loader/Loader"
import { MessageContext } from "../../contexts/userMessage.context";
import { AuthContext } from "../../contexts/auth.context";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import { Oval } from "react-loader-spinner";

const ServicesListPage = () => {
  const [services, setServices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [load, isLoading] = useState(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { setShowToast, setToastMessage } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    isLoading(true);
    servicesService
      .getServices()
      .then(({ data }) => {
        setServices(data);
        setSearchResults(data);
        isLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fireFinalActions = () => {
    setShowToast(true);
    setToastMessage("Nuevo servicio creado");
    closeModal();
    loadServices();
  };

  return (
    <>
      {load ? (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh", // Ajusta según el alto de tu pantalla
            }}>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#181818"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              secondaryColor="#181818"
            />
          </div>
        </>
      ) : (
        <Container>
          <div className="header_title">
            <h1>¿Qué necesitas?</h1>
          </div>
          <div className="container3">
            {" "}
            <div>
              {user && (
                <button className="btn2 btn2--profile" onClick={openModal}>
                  Da de alta tu servicio
                </button>
              )}
            </div>
          </div>
          <SearchBar services={services} setSearchResults={setSearchResults} />
          <SearchResults
            searchResults={searchResults}
            loadServices={loadServices}
          />
          <br />
        </Container>
      )}

      <hr />

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              fontWeight: "100",
              fontSize: "50px",
              letterSpacing: "-0.05em",
            }}>
            ¿Qué sabes hacer?
            <p
              style={{
                opacity: "0.5",
                fontSize: "16px",
                letterSpacing: "0px",
              }}>
              Súbelo a tu comunidad y empieza a itercambiar horas con el resto
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddServiceForm fireFinalActions={fireFinalActions} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServicesListPage;
