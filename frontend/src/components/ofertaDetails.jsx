import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { GetOferta } from "../services/detailsOferta";
import { deleteOferta } from "../services/gestor/deleteOferta";
import { GetInscripciones } from "../services/inscripciones";
import { cambiarEstado } from "../services/gestor/cambiarEstado";
import { updateOferta } from "../services/gestor/ofertaUpdate";
import { inscriureOferta } from "../services/alumne/inscriureOferta"
import { getCiclos } from "../services/ciclos";
import '../assets/empresa.css'
import '../assets/register.css'
import { getCookie } from "../context/cookies";
export function OfertaDetails() {
    const { idOferta } = useParams();
    let [oferta, setOferta] = useState([])
    let [inscripciones, setInscripciones] = useState([])
    const [ciclos, setCiclos] = useState([])
    const [verInscritos, setVerInscritos] = useState([])
    const navigate = useNavigate();
    // const [rolUser, setRol] = useState('user');
    const [activeForm, setActiveForm] = useState("oferta");

    const [inscrito, setInscrito] = useState(false);
    useEffect(() => {
        GetOferta(idOferta).then(oferta => setOferta(oferta))
        getCiclos().then(ciclos => setCiclos(ciclos))


    }, [])

    useEffect(() => {
        if (getCookie('vRole') === 'gestor') {
            GetInscripciones(idOferta).then(inscripciones => setInscripciones(inscripciones))
        }
    }, [])



    const changeEstate = (inscripcion, keyword) => {
        const body = {
            inscripcion: inscripcion,
            action: keyword
        }
        cambiarEstado(body).then(navigate('/oferta/' + idOferta))
    }

    const handleFormOferta = () => {
        setActiveForm("oferta");
    }

    const handleFormEdit = () => {
        setActiveForm("edit");
    }
    const handelFormInscrito = () => {
        setActiveForm("inscritos")
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
    function handleClickInscrito(event) {
        event.preventDefault()
        const inscripcion = Object.FormData.fromEntries(
            new window.FormData(event.target)
        )
    }

    const handleClickDelete = () => {
        console.log('dsad')
        deleteOferta({ id: idOferta }).then(navigate('/getOfertas'))

    }

    const handleClickOferta = () => {
        console.log("Button Inscriure Oferta " + idOferta)
        inscriureOferta({ idOferta: idOferta })
        setInscrito(true);
    }
    function ButtonInscriureOferta() {
        let role = getCookie('vRole')
        let button = null;
        if (role === 'alumno') {
            console.log('alumno')
            button =
                <button onClick={handleClickOferta} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-2 border-blue-700 hover:border-blue-500 rounded ml-3">
                    {inscrito ? "Inscrito" : "Inscribirse"}
                </button>
        }
        return (
            <div>
                {button}
            </div>
        )
    }

    function ButtonsGestionOferta() {
        let role = getCookie('vRole')
        let button;
        if (role != 'alumno') {
            return (
                <div>
                    <button onClick={handelFormInscrito} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/4 mb-4'>ver Inscritos</button>
                    <button onClick={handleFormEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <img src="/public/iconos/editar.png" alt="papelera" />
                    </button>
                    <button onClick={() => { handleClickDelete() }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        <img src="/public/iconos/eliminar.png" alt="papelera" />
                    </button>
                </div>)

        } else {
            return ''
        }



    }

    let html;

    if (oferta.oferta && inscripciones) {

        const isoDate = oferta.oferta.expirationDate;
        const dateObj = new Date(isoDate);
        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
        // {console.log(formattedDate)}
        html = (
            <>
                <div className={activeForm === 'oferta' ? 'form-containerV sign-up-container' : 'form-containerV sign-up-container hidden'}>
                    <div className="detailOferta border-double border-4 border-blue-900 ... bg-slate-100 shadow-xl  font-serif text-lg pl-5 ">
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 ">{oferta.oferta.title}</h1>

                        {<ButtonsGestionOferta />}

                        <h3 className="uppercase font-bold ">Id de la Empresa:</h3> {oferta.oferta.idEmpresa}
                        <h3 className="uppercase font-bold">Fecha de publicacion: </h3>{formattedDate}
                        <p className="pt-5" ><b>Requeriments:</b> {oferta.oferta.requirements}</p>
                        <p className="pt-5"><b>ciclo:</b>{oferta.oferta.ciclo}</p>
                        <p className="pt-5"><b>Skills:</b> {oferta.oferta.skills}</p>
                        <p className="pt-5"><b>Descripción:</b> {oferta.oferta.description}</p>

                        <div>
                            {ButtonInscriureOferta()}
                        </div>
                    </div>
                </div>
                <div className={activeForm === 'edit' ? 'form-containerE sign-up-container' : 'form-containerE sign-up-container hidden'}>
                    <div className=" divResp ">
                        <button onClick={handleFormOferta} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver Oferta
                        </button>
                        <form onSubmit={(event) => { event.preventDefault(); handleFormEditOferta(event); }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <span className="block text-gray-700 text-sm font-bold mb-2">Título</span>
                            <input type="text" name="titulo" defaultValue={oferta.oferta.title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

                            <span className="block text-gray-700 text-sm font-bold mb-2">Ciclo</span>
                            <select name="ciclo" id="ciclo" placeholder='ciclo' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="0">--- INSERTA ---</option>
                                {
                                    ciclos ? ciclos.map(e => {
                                        console.log(e.name)
                                        return (<option>{e.name}</option>)
                                    }) : ''
                                }
                            </select>

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

                <div className={activeForm === 'inscritos' ? 'form-containerE sign-up-container' : 'form-containerE sign-up-container hidden'}>
                    <button onClick={handleFormOferta} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/4 mb-4'>oferta</button>
                    <div className=" usuarios relative   sm:rounded-lg  my-4  text-4xl">
                        <table className="formUser text-sm text-left    ">
                            <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">nom</th>
                                    <th scope="col" className="px-6 py-3">email</th>
                                    <th scope="col" className="px-6 py-3">operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(inscripciones)}
                                {inscripciones.map(e => {
                                    let html = ''
                                    if (e.estado == 'aceptado') {
                                        html = <tr key={e._id} className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                                        <td className="px-6 py-4"> <Link to={`/search/user/${e.refUser._id}`}>{e.refUser.name.toUpperCase()}</Link></td>
                                        <td className="px-6 py-4">{e.refUser.email}</td>
                                        {console.log(e)}
                                        <td className="bg-blue-800 bg-opacity-100 text-white">ACEPTADO</td>
                                    </tr>
                                    } else if (e.estado == 'rechazado') {
                                        html = <tr key={e._id} className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                                            <td className="px-6 py-4"> <Link to={`/search/user/${e.refUser._id}`}>{e.refUser.name.toUpperCase()}</Link></td>
                                            <td className="px-6 py-4">{e.refUser.email}</td>
                                            {console.log(e)}
                                            <td className="bg-red-800 bg-opacity-100 text-white">RECHAZADO</td>
                                        </tr>
                                    } else {
                                        html =
                                            <tr key={e._id} className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                                                <td className="px-6 py-4"> <Link to={`/search/user/${e.refUser._id}`}>{e.refUser.name.toUpperCase()}</Link> </td>
                                                <td className="px-6 py-4">{e.refUser.email}</td>
                                                {console.log(e)}
                                                <td><button
                                                    onClick={() => changeEstate(e._id, 'aceptar')} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-2 border-blue-700 hover:border-blue-500 rounded ml-3">Aceptar</button>
                                                    <button
                                                        onClick={() => changeEstate(e._id, 'rechazar')} className="bg-red-500 hover:bg-red-400 text-white font-bold  px-4 border-b-2 border-red-700 hover:border-red-500 rounded ml-4">Rechazar</button>
                                                    {/* disabled={rolUser !== 'gestor'} */}</td>
                                            </tr>
                                    }
                                    return html
                                }



                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    } else {
        html = (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    return html
}