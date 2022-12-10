import { Container, Form, Button, Stack } from 'react-bootstrap'



function SearchBar() {

    return (

        <Container>
            <Stack direction="horizontal" gap={3}>
                <Form.Control className="me-auto" placeholder="Introduce el servicio" />
                <Button variant="success">Buscar</Button>
                <div className="vr" />
                <Button variant="outline-danger">Reiniciar</Button>
            </Stack>
        </Container>

    )
}

export default SearchBar