import "./ServiceCard.css";
import { Button, ButtonGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import servicesService from "../../services/services.service";

function ServiceCard({
  name,
  image,
  _id,
  owner,
  loadServices,
  description,
  email,
}) {
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
    <>
      <Link className="card-timeshare-list" to={`/servicios/detalles/${_id}`}>
        <div className="container-body-card">
          <img
            src={image}
            alt=""
            className="background-image"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="background-overlay"></div>
          <div className="overlay-content">
            <div className="container-title-card">
              <h3>{name}</h3>
            </div>
            {user?.role === "ADMIN" ? (
              <>
                {" "}
                <div className="container-valoration-calendar">
                  <div className="container-calendar-card">
                    <Link to={"/servicios"}>
                      <button
                        onClick={delOneServcice}
                        className=" btn2 btn2--delete">
                        Eliminar
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="container-valoration-calendar">
                  <div className="container-calendar-card">
                    {" "}
                    <div className="calendar_detail--sm">
                      <span
                        className="day_calendar--sm"
                        style={{ color: "black" }}>
                        MIE
                      </span>
                      <br />
                      <span
                        className="hours_calendar--sm"
                        style={{ color: "black" }}>
                        17:00
                      </span>
                    </div>
                  </div>
                  <div className="container-valoration-card">
                    <span>{}</span>
                    ⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* <Card className="mb-4 ServiceCard">
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
      </Card> */}
    </>
  );
}

export default ServiceCard;
