import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { GetOferta } from "../services/app/detailsOferta";
import { deleteOferta } from "../services/gestor/deleteOferta";
import { GetInscripciones } from "../services/app/inscripciones";
import { cambiarEstado } from "../services/gestor/cambiarEstado";
import { updateOferta } from "../services/gestor/ofertaUpdate";
import { inscriureOferta } from "../services/alumne/inscriureOferta"
import '../assets/empresa.css'
import '../assets/register.css'
export function OfertaDetails() {
    const { idOferta } = useParams();
    let [oferta, setOferta] = useState([])
    let [inscripciones, setInscripciones] = useState([])
    const navigate = useNavigate();
    const [activeForm, setActiveForm] = useState("oferta");
    const [inscrito, setInscrito] = useState(false);

    useEffect(() => {
        GetOferta(idOferta).then(oferta => setOferta(oferta))
    }, [])

    useEffect(() => {
        GetInscripciones(idOferta).then(inscripciones => setInscripciones(inscripciones))
    }, [])

    const changeEstate = (inscripcion, keyword) => {
        const body = {
            inscripcion: inscripcion,
            action: keyword
        }
        cambiarEstado(body).then(navigate('/oferta/'+idOferta))
    }

    const handleFormOferta = () => {
        setActiveForm("oferta");
    }

    const handleFormEdit = () => {
        setActiveForm("edit");
    }

    useEffect(() => { }, [activeForm]);

    function handleFormEditOferta(event) {
        const oferta = Object.fromEntries(
            new window.FormData(event.target)
        )
        oferta.id = idOferta
        console.log(oferta)
        updateOferta(oferta)
    }

    function handleClickEdit(event) {
        event.preventDefault()
        const oferta = Object.FormData.fromEntries(
            new window.FormData(event.target)
        )

    }

    const handleClickDelete = () => {
        console.log('dsad')
        deleteOferta({ id: idOferta }).then(navigate('/getOfertas'))

    }

    const handleClickOferta = () => {
        console.log("Button Inscriure Oferta "+ idOferta)
        inscriureOferta({idOferta: idOferta})
        setInscrito(true);
    }
    function ButtonInscriureOferta(props){
        
    
    
        return(
            <>
                <div>
                    <button onClick={handleClickOferta}>
                        {inscrito ? "Inscrito" : "Inscribirse"}
                    </button>
                </div>
            </>
        )
    }

    let html;

    if (oferta.oferta && inscripciones) {

        const isoDate = oferta.oferta.expirationDate;
const dateObj = new Date(isoDate);
const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

        html = (
            <>

                <div className={activeForm === 'oferta' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
                    <div className="detailOferta border-double border-4 border-blue-900 ... bg-slate-100 shadow-xl  font-serif text-lg pl-5 ">
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 ">{oferta.oferta.title}</h1>

                        <button onClick={handleFormEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <img src="/public/iconos/editar.png" alt="papelera" />
                        </button>
                        <button onClick={() => { handleClickDelete() }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            <img src="/public/iconos/eliminar.png" alt="papelera" />
                        </button>
                        <h3 className="uppercase font-bold ">Id de la Empresa:</h3> {oferta.oferta.idEmpresa}
                        <h3 className="uppercase font-bold">Fecha de publicacion: </h3>{formattedDate}
                        <p className="pt-5"><b>Requeriments:</b> {oferta.oferta.requirements}</p>
                        <p className="pt-5"><b>Skills:</b> {oferta.oferta.skills}</p>
                        <p className="pt-5"><b>Descripción:</b> {oferta.oferta.description}</p>

                        <h3>Inscritos:</h3>
                        <ul>


                            {
                                inscripciones.map(inscripcion => {
                                    let html2 = ''
                                    if (inscripcion.estado == 'aceptado') {
                                        html2 = (
                                            <li key={inscripcion._id} className='cardInscrito'>
                                                {console.log(inscripcion)}
                                                <Link to={`/search/user/${inscripcion.refUser._id}`}>{inscripcion.refUser.name.toUpperCase()}</Link>
                                                <span>ACEPTADO</span>
                                            </li>
                                        )
                                    }
                                    else if (inscripcion.estado == 'rechazado') {
                                        html2 = (
                                            <li key={inscripcion._id} className='cardInscrito'>
                                                {console.log(inscripcion)}
                                                <Link to={`/search/user/${inscripcion.refUser._id}`}>{inscripcion.refUser.name.toUpperCase()}</Link>
                                                <span>RECHAZADO</span>
                                            </li>
                                        )
                                    }
                                    else {
                                        html2 = (
                                            <li key={inscripcion._id} className='cardInscrito'>
                                                {console.log(inscripcion)}
                                                <Link to={`/search/user/${inscripcion.refUser._id}`}>{inscripcion.refUser.name.toUpperCase()}</Link>
                                                <button onClick={() => changeEstate(inscripcion._id, 'aceptar')}>Aceptar</button>
                                                <button onClick={() => changeEstate(inscripcion._id, 'rechazar')}>Rechazar</button>
                                            </li>
                                        )
                                    }
                                    return html2

                                }

                                )
                            }

                        </ul>
                        {
                            localStorage.getItem('vRole') === 'alumno' && (
                              ButtonInscriureOferta()
                            )
                        }
                    </div>
                </div>
                <div className={activeForm === 'edit' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
                    <div className=" divResp ">
                        <button onClick={handleFormOferta} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver Oferta
                        </button>
                        <form onSubmit={(event)=>{event.preventDefault(); handleFormEditOferta(event);}} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <span className="block text-gray-700 text-sm font-bold mb-2">Título</span>
                            <input type="text" name="titulo" defaultValue={oferta.oferta.title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Ciclo</span>
                            <select name="ciclo" defaultValue={oferta.oferta.ciclo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="ciclo1">Ciclo 1</option>
                                <option value="ciclo2">Ciclo 2</option>
                                <option value="ciclo3">Ciclo 3</option>
                            </select><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Requerimientos</span>
                            <input type="text" name="requirements" defaultValue={oferta.oferta.requirements} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Skills</span>
                            <input type="text" name="skills" defaultValue={oferta.oferta.skills} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Descripcion</span>
                            <textarea type="text" name="descripcion" defaultValue={oferta.oferta.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Fecha de expiración</span>
                            <input type="date" name="fechaExpiracion" defaultValue={new Date(oferta.oferta.expirationDate).toISOString().substr(0, 10)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
                            
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
                        </form>


                    </div>
                </div>
            </>
        )
    } else {
        html = (
            <>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    return html
}