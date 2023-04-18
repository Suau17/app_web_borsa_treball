import { RegisterResponsable } from "../services/register"

export function FormResponsable() {

    function crearResponsable(event) {
        event.preventDefault()
         const responsable = Object.fromEntries(
            new window.FormData(event.target)
        )
        console.log(responsable)
        RegisterResponsable(responsable)
    }

    return (
        <>
            <div className=" divResp w-full max-w-xs">
            <h1 class="block text-gray-700 text-xl font-bold mb-2">Crear Responsable</h1>

            <form onSubmit={crearResponsable} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">Nom</span>
                <input type="text" name='name' placeholder="Name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br />
                <span class="block text-gray-700 text-sm font-bold mb-2">Email</span>
                <input type="email" name='email' placeholder="Email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br />
                <span class="block text-gray-700 text-sm font-bold mb-2">Password</span>
                <input type="password" name='password' placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br />
                <span class="block text-gray-700 text-sm font-bold mb-2">Carrec empresa</span>
                <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br />
                <span class="block text-gray-700 text-sm font-bold mb-2">telefon</span>
                <input type="text" name='telefon' placeholder='telefon' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br />

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
            </form>
            </div>
        </>
    )

}