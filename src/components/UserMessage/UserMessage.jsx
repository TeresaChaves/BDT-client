import { useContext } from "react";
import { Toast } from "react-bootstrap";
import { MessageContext } from "../../contexts/userMessage.context";
import "./UserMessage.css";

const UserMessage = () => {
  const { setShowToast, toastMessage, showToast } = useContext(MessageContext);

  return (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={3000}
      autohide
      style={{ position: "fixed", bottom: 10, right: 10, opacity: "1" }}
      className="toast custom-toast">
      <Toast.Header>
        <strong className="me-auto">Mensaje</strong>
      </Toast.Header>
      <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
  );
};

export default UserMessage;
