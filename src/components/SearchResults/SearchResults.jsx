import ServiceCard from "../ServiceCard/ServiceCard";
import { Col, Row } from "react-bootstrap";

function SearchResultsPages({ searchResults, loadServices }) {
  console.log("serar", searchResults);
  return (
    <>
      {searchResults?.length ? (
        <Row>
          {searchResults.map((elm) => {
            return (
              <Col sm={{ span: 3 }} key={elm._id}>
                <ServiceCard
                  {...elm}
                  searchResults={searchResults}
                  loadServices={loadServices}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <article>
          <p>No se ha encontrado ningún servicio</p>
        </article>
      )}
    </>
  );
}

export default SearchResultsPages;
