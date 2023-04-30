import { updateEmpresa } from "../services/gestor/empresaUpdate";
import '../assets/empresa.css';
export function FormEmpresa() {

    function actualizarEmpresa(event) {
        event.preventDefault()
        const empresa = Object.fromEntries(
            new window.FormData(event.target)
        )
        console.log(empresa)
        updateEmpresa(empresa)
    }

    return (<>
        
        <div  className=" divUpdate w-full max-w-xs">
        <h1 className="block text-gray-700 text-xl font-bold mb-2">Empresa Update</h1>
        <form onSubmit={actualizarEmpresa} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Nom de l'empresa</span>
            <input type="text" name="nom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Direccion de l'empresa</span>
            <input type="text" name="direccion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2"> Sector</span>
            <input type="text" name="sector" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> <br />

            <button onClick={updateEmpresa} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
        </form>
        </div>
    </>
    )
}