import { Container, Row, Col } from "react-bootstrap";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
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
            Registro
          </div>

          <hr />

          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
