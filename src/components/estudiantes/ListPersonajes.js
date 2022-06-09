import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Container, Row, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import CardCharacters from './CardsPersonajes';

function ListCharact() {
    const url = "http://localhost:5000/characters"

    //1. Función asíncrona para realizar la petición
    const getData = async () => {
        const response = axios.get(url);
        return response;
    }

    //3. useState para guardar la respuesta de la petición en un estado y poderla usar en un componente
    const [list, setList] = useState([]);

    //4. agregamos otra constante al useState para actualizar el listado después de eliminar 
    const [upList, setUpList] = useState([false]);

    //  agregamos otra constante al useState para actualizar el estado del modal 
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleOpen = () => { setShow(true); }

    //6. Estado para obtener los datos de cada registro a editar
    const [dataModal, setDataModal] = useState({});

    // hableSubmit - handleChange -handleChangeModal
    const handleChangeModal = ({ target }) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${url}/${dataModal.id}`, dataModal);//await espera hasta que se ejcute la petición
        console.log(response);
        if (response.status === 200) {

            Swal.fire(
                'Guardado!',
                `El personaje <strong> ${response.data.nombre} ${response.data.apellido}</strong> ha sido guardado exitosamente!`,
                'success'
            )
            handleClose();
            setUpList(!upList);

        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar el personaje!',
                'error'
            )
        }
    }

    useEffect(() => {
        getData().then((response) => {
            setList(response.data);
        })
    }, [upList])
    console.log(list);

    return (
        <Container>
            <Row>
                {
                    list.map((charac, index) => (
                        <CardCharacters
                            key={index}
                            characters={charac}
                            setUpList={setUpList}
                            upList={upList}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                            setDataModal={setDataModal} />
                    ))
                }
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar personaje</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del personaje"
                                name="nombre"
                                value={dataModal.nombre}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el apellido del personaje"
                                name="apellido"
                                value={dataModal.apellido}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre completo del personaje"
                                name="completo"
                                value={dataModal.completo}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Padres</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese los padres del personaje"
                                name="padres"
                                value={dataModal.padres}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la fecha de nacimiento del personaje"
                                name="nacimiento"
                                value={dataModal.nacimiento}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el link de la imagen"
                                name="foto"
                                value={dataModal.foto}
                                onChange={handleChangeModal} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Digite su perfil"
                                name="perfil"
                                value={dataModal.perfil}
                                onChange={handleChangeModal} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-dark mb-5 ms-5" onClick={handleClose}>Cerrar</button>
                        <button className="btn btn-success mb-5" type='submit'>Guardar cambios</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}

export default ListCharact;