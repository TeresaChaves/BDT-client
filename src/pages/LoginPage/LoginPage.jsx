import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <div>
            <div
              style={{
                fontWeight: "100",
                fontSize: "50px",
                letterSpacing: "-0.05em",
                marginBottom: "20px",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}>
              Log In
            </div>
          </div>

          <hr />

          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
