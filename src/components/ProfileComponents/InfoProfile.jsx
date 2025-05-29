import { RoughNotation } from "react-rough-notation";
import { Row } from "react-bootstrap";

function InfoProfile({ user }) {
  const isMobile = window.innerWidth < 768;
  return (
    <>
      {" "}
      <Row>
        <div style={{ marginBottom: "30px" }}></div>
        <div className="container-profile-info">
          <div className="container_name">
            <p>{user.username}</p>
            <img src={user.avatar} className="avatar" />
          </div>

          <div className="container_hour">
            TIENES{" "}
            {!isMobile && (
              <RoughNotation type="highlight" color="yellow" show>
                <span>{user?.bankAccountTime}</span>
              </RoughNotation>
            )}
            {isMobile && <span>{user?.bankAccountTime}</span>}
            HORAS
          </div>
        </div>
      </Row>
    </>
  );
}

export default InfoProfile;
