import "../EmptyData/EmptyData.css";
import { RoughNotation } from "react-rough-notation";

function EmptyData({ whiteText }) {
  return (
    <>
      <div className="container-emptyData">
        <span style={{ color: whiteText ? "white" : "black" }}>
          No tienes ninguna solicitud pendiente en tu perfil
        </span>
      </div>
    </>
  );
}
export default EmptyData;
