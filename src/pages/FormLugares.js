import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import NavBar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";

function FormPersonajes() {

    /*5. Constante history para retornar al listado*/
    const history = useNavigate();

    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data, setData] = useState({
        lugar: "",
        foto: "",
        perfil: ""
    })
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */
    const handleChange = ({ target }) => {

        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    /*4. Crear petición asíncrona*/
    const url = "http://localhost:5000/places";

    /*3. funci{on para procesar el envío del formulario*/
    

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const response = await axios.post(url, data);//await espera hasta que se ejcute la petición
        //console.log(response);
        if (response.status === 201) {

            Swal.fire(
                'Guardado!',
                `El lugar <strong> ${response.data.lugar} </strong> ha sido guardado exitosamente!`,
                'success'
            )
            history.push("/");

        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar el lugar!',
                'error'
            )
        }
    }

    return (
        <>
            <NavBar />
            <h1 className='text-center'>Datos de un nuevo lugar</h1>
            <Container>
                <Form onSubmit={handleSubmitForm} >
                    <Form.Group className="mb-3">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del lugar"
                            name="lugar"
                            value={data.lugar}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el link de la imagen"
                            name="foto"
                            value={data.foto}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Digite su perfil"
                            name="perfil"
                            value={data.perfil}
                            onChange={handleChange} />
                    </Form.Group>

                    <button className="btn btn-success mb-5">Guardar</button>
                    <button className="btn btn-dark mb-5 ms-5"><Link to="/lugares" className="volver">Volver</Link></button>
                </Form>
            </Container>
        </>
    )
}
export default FormPersonajes;