import axios from 'axios';
import { Form, Container, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import TablePlaces from './TableLugares';

function ListPlace() {
    // Definir url del api a la que me voy a conectar
    const url = "http://localhost:5000/places"

    // Generar funcion asincrona para conectarme al api
    const getData = async () => {
        const response = axios.get(url);
        return response;
    }

    // useState para guardar la respuesta de la peticion
    const [list, setList] = useState([]);

    // crear otro estdo para refrescar el listado despues de eliminar
    const [upList, setUpList] = useState([false])

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

    // hook useEffect ejecuta funciones cada vez que renderizamos un componente
    useEffect(() => {
        getData().then((response) => {
            setList(response.data);
        })
    }, [upList])
    console.log(list);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${url}/${dataModal.id}`, dataModal);//await espera hasta que se ejcute la petición
        console.log(response);
        if (response.status === 200) {

            Swal.fire(
                'Guardado!',
                `El lugar <strong> ${response.data.lugar}</strong> ha sido guardado exitosamente!`,
                'success'
            )
            handleClose();
            setUpList(!upList);

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
            <Container>
                <table className='table table-stripped'>
                    <thead>
                        <th>Lugar</th>
                        <th>Foto</th>
                        <th>Descripcion</th>
                        <th colSpan={2}>Acciones</th>
                    </thead>
                    <tbody>
                        {
                            list.map((place, index) => (
                                <TablePlaces
                                    key={index}
                                    places={place}
                                    setUpList={setUpList}
                                    upList={upList}
                                    handleOpen={handleOpen}
                                    setDataModal={setDataModal}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar personaje</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Lugar</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del lugar"
                                name="lugar"
                                value={dataModal.lugar}
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
        </>

    )
}

export default ListPlace;