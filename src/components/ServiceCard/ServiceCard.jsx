import "./ServiceCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import servicesService from "../../services/services.service";
import StartRating from "../StartRating/StartRating";
import CalendarSM from "../ProfileComponents/CalendarSM";

function ServiceCard({
  name,
  image,
  _id,
  owner,
  loadServices,
  description,
  email,
  averageRating,
  disponibility,
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
  console.log(averageRating);

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
                    <CalendarSM cardList disponibility={disponibility} />
                  </div>
                  <div className="container-valoration-card">
                    <span style={{ opacity: "0.5" }}>{owner.username}</span>
                    <span>
                      <StartRating rating={averageRating} />
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

export default ServiceCard;
