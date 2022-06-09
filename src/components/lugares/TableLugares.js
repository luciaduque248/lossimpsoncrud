import Swal from 'sweetalert2';
import axios from 'axios';

function TablePlaces({ places, setUpList, upList,handleOpen, setDataModal }) {
    const url = "http://localhost:5000/places"

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
                axios.delete(`${url}/${places.id}`).then((response) => {
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

    const handleEdit=()=>{
        handleOpen();
        setDataModal(places)
    }
    return (
        <tr>
            <td>{places.lugar}</td>
            <td><img src={places.foto} alt={places.lugar} width="350px" /></td>
            <td><p className='text-justify'>{places.perfil}</p></td>

            <td><button className='btn btn-warning' onClick={handleEdit}>Editar</button></td>
            <td><button className='btn btn-danger' onClick={handleDelete}>Eliminar</button></td>
        </tr>
    )
}

export default TablePlaces;