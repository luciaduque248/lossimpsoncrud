import NavBar from "../components/navbar/Navbar";
import Video from '../components/video/video'
import './inicio.css'

function Home(){
    return(
        <div>
            <NavBar/>
            <div className="video">
                <Video/>
            </div>
            <div className="fondoSimpson">
                <p>Los Simpson (en inglés: The Simpsons) es una serie estadounidense de comedia, en formato de animación, creada por Matt Groening para Fox Broadcasting Company y emitida en varios países del mundo. La serie es una sátira de la sociedad estadounidense que narra la vida y el día a día de una familia de clase media de ese país (cuyos miembros son Homer, Marge, Bart, Lisa y Maggie Simpson) que vive en un pueblo ficticio llamado Springfield.</p>
            </div>
        </div>
        )
    }
    
    export default Home;