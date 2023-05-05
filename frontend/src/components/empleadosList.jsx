import { useCallback, useContext, useEffect, useState } from "react";
import { getEmployees } from "../services/gestor/empleadosList";
import { deleteEmployee } from "../services/gestor/empleadosDelete";

export function TableEmployees() {
  const [empleados, setEmpleados] = useState([]);
  useEffect(() => {
    getEmployees().then((empleado) => setEmpleados(empleado));
  }, []);

  const handleDelete = useCallback(
    (id) => {
      deleteEmployee(id).then(() =>
        setEmpleados((prevEmpleados) =>
          prevEmpleados.filter((empleado) => empleado._id !== id)
        )
      );
    },
    [setEmpleados]
  );

  let html = "";
  if (empleados.length > 0) {
    html = (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-80 my-4 w-2/3 ">
          <table className="w-full text-sm text-left   ">
            <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Operacions
              </th>
            </thead>
            <tbody className="bg-white border-2  border-blue-500  hover:bg-gray-200">
              {empleados.map((element) => (
                console.log(element),
                <tr
                  key={element._id}
                  className="bg-white border-2 border-blue-500  hover:bg-gray-200"
                >
                  <td className="px-6 py-4">{element.name}</td>
                  <td className="px-6 py-4">{element.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="bg-red-500 text-white font-semibold  py-2 px-4 border border-red-500 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    html = (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return html;
}
