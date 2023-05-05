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

            <h4 className="uppercase font-bold">Títol</h4>{data.title}
            
            <h4 className="uppercase font-bold">Requeriments</h4>{data.requeriments}
            <h4 className="uppercase font-bold">Habilitats</h4>{data.skills}
            
            <h4 className="uppercase font-bold">Data de publicació</h4>{data.dateOfPublication}

        </div>

    )
}