import { Container, Form, Button, Stack } from 'react-bootstrap'





const SearchBar = ({ services, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(services)

        const resultsArray = services.filter(service => service.name.includes(e.target.value))
        console.log({ resultsArray })
        setSearchResults(resultsArray)
    }

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
                <Button variant="success">Buscar</Button>

            </form>
        </header>
    )
}
export default SearchBar







        // <Container>
        //     <Stack direction="horizontal" gap={3}>
        //         <Form.Control className="me-auto" placeholder="Introduce el servicio" />
        //         <Button variant="success">Buscar</Button>
        //         <div className="vr" />
        //         <Button variant="outline-danger">Reiniciar</Button>
        //     </Stack>
        // </Container>



