import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import NavBar from "../components/navbar/Navbar";
import { FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function FormPersonajes() {

    /*5. Constante history para retornar al listado*/
    const history = useNavigate();

    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data, setData] = useState({
        id: "",
        nombre: "",
        apellido: "",
        completo: "",
        padres: "",
        nacimiento: "",
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
    const url = "http://localhost:5000/characters";

    /*3. funci{on para procesar el envío del formulario*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(url, data);//await espera hasta que se ejcute la petición
        //console.log(response);
        if (response.status === 201) {

            Swal.fire(
                'Guardado!',
                `El personaje <strong> ${response.data.nombre} ${response.data.apellido}</strong> ha sido guardado exitosamente!`,
                'success'
            )
            history.push("/");

        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar el personaje!',
                'error'
            )
        }
    }

    return (
        <>
            <NavBar />
            <h1 className='text-center'>Datos de un nuevo personaje</h1>
            <Container>
                <Form onSubmit={handleSubmit} >

                    <FormGroup className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del personaje"
                            name="nombre"
                            value={data.nombre}
                            onChange={handleChange} ></Form.Control>

                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido del personaje"
                            name="apellido"
                            value={data.apellido}
                            onChange={handleChange}></Form.Control>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre completo del personaje"
                            name="completo"
                            value={data.completo}
                            onChange={handleChange}></Form.Control>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Padres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese los padres del personaje"
                            name="padres"
                            value={data.padres}
                            onChange={handleChange}></Form.Control>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la fecha de nacimiento del personaje"
                            name="nacimiento"
                            value={data.nacimiento}
                            onChange={handleChange}></Form.Control>
                    </FormGroup>

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
                    <button className="btn btn-dark mb-5 ms-5"><Link to="/personajes" className="volver">Volver</Link></button>
                </Form>
            </Container>
        </>
    )
}
export default FormPersonajes