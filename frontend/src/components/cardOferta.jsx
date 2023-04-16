import { useNavigate } from "react-router-dom";
export function CardOferta(props) {
    const data = props.data
    const navigate = useNavigate()
    //console.log(data)

    function buscarOferta() {
        navigate(`/oferta/${data._id}`)
    }

    return (

        <div onClick={buscarOferta} className="cardOferta border-double border-4 border-blue-900 ... bg-slate-100 shadow-xl  font-serif text-xl">

            <h4 className="uppercase font-bold">Titulo</h4>{data.title}
            
            <h4 className="uppercase font-bold">Requerimientos</h4>{data.requeriments}
            <h4 className="uppercase font-bold">Skills</h4>{data.skills}
            
            <h4 className="uppercase font-bold">Fecha de Publicacion</h4>{data.dateOfPublication}

        </div>

    )
}