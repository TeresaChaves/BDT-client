import "./ServiceCard.css";
import { Button, ButtonGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth.context";
import servicesService from "../../services/services.service";

function ServiceCard({ name, image, _id, owner, loadServices, description }) {
  const delOneServcice = () => {
    servicesService
      .deleteService(_id)
      .then(({ data }) => {
        loadServices();
      })
      .catch((err) => console.error(err));
  };

  const { user } = useContext(AuthContext);

  return (
    <Card className="mb-4 ServiceCard">
      <Link to={`/servicios/detalles/${_id}`}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          {user?.role === "ADMIN" ? (
            <>
              <div className="d-grid">
                <ButtonGroup aria-label="Basic example" size="sm">
                  <Link to={"/servicios"}>
                    <Button variant="danger" onClick={delOneServcice}>
                      Eliminar
                    </Button>
                  </Link>
                </ButtonGroup>
                <br />
              </div>
              <>
                <Link to={`/servicios/detalles/${_id}`}>
                  <div className="d-grid">
                    <button className="card-button" size="sm">
                      {name}
                    </button>
                  </div>
                </Link>
              </>
            </>
          ) : (
            <>
              <>
                {" "}
                <div className="container-name">{name}</div>
              </>
            </>
          )}
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ServiceCard;
