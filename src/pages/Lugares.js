import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"
import NavBar from "../components/navbar/Navbar";
import ListPlace from "../components/lugares/ListLugares";

function Lugares() {
    return (
        <div>
            <NavBar />
            <Container>
                <Link to="/formulario-lugares" className="btn btn-success">Crear Lugares</Link>
                <h1 className="text-center mt-3 mb-5">Listado de Lugares</h1>

                <ListPlace />
            </Container>
        </div>


    )
}

export default Lugares;