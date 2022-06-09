import { Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

function CardCharacters({ characters, setUpList, upList, handleOpen, setDataModal}) {
    // 1. Crear petición asíncrona
    const url = "http://localhost:5000/characters"

    // 2. Función para borrar un registro a partir del evento botón eliminar
    const handleDelete = async () => {
        Swal.fire({
            title: '¿Esta seguro que desea eliminar este lugar?',
            text: "No puede revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${url}/${characters.id}`).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire(
                            'Borrado exitosamente!',
                            'El lugar seleccionado fue borrado.',
                            'success'
                        )
                        setUpList(!upList)
                    }else{
                        Swal.fire(
                            'Error',
                            'Hubo un problema al borrar el lugar',
                            'error'
                        )
                    }
                })

            }
        })
    }

    // funcion para editar un registro
    const handleEdit=()=>{
        handleOpen();
        setDataModal(characters)
    }

    return (
        <div className="col-4 mb-5">
            <Card style={{ width: '18rem', height: '120vh'}}>
                <Card.Img variant="top" src={characters.foto} height="170px" />
                <Card.Body>
                    <Card.Title className='text-center'>{characters.nombre} {characters.apellido}</Card.Title>
                    <Card.Text>
                        <strong>Nombre completo: </strong><br />{characters.completo}<br />
                        <strong>Padres: </strong>{characters.padres}<br />
                        <strong>Nacimiento: </strong>{characters.nacimiento}<br />
                        {characters.perfil}<br />
                    </Card.Text>
                    <Button variant="warning me-2" onClick={handleEdit}>Editar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardCharacters;

/*
            "id": 10,
            "nombre": "",
            "apellido": "",
            "completo": "",
            "padres": "",
            "nacimiento": "",
            "foto": "",
            "perfil": ""
        */