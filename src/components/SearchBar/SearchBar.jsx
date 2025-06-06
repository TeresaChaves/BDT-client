import { Container, Form, Stack } from "react-bootstrap";
import capitalize from "../../utils/capitalize";
import "./SearchBar.css";

const SearchBar = ({ services, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(services);

    const resultsArray = services.filter((service) =>
      service.name.includes(capitalize(e.target.value))
    );
    setSearchResults(resultsArray);
  };

  return (
    <main>
      <Container className="searchBar">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto search__input"
            placeholder="Buscar"
            type="text"
            id="search"
            onChange={handleSearchChange}
          />
        </Stack>
      </Container>
      <br />
    </main>
  );
};
export default SearchBar;
