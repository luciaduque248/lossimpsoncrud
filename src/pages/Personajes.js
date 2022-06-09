import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"
import ListEstudiantes from "../components/estudiantes/ListPersonajes";
import NavBar from "../components/navbar/Navbar";

function Estudiantes() {
    return (
        <div>
            <NavBar />
            <Container>
                <Link to="/formulario-personajes" className="btn btn-success">Crear Personaje</Link>
                <h1 className="text-center mt-3 mb-5">Listado de Personajes</h1>

                <ListEstudiantes />
            </Container>
        </div>


    )
}

export default Estudiantes;