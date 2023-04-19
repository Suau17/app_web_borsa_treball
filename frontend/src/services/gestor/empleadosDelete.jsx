const url = `${import.meta.env.VITE_URL}/gestor/empresa/empleado/delete`

export async function deleteEmployee(id) {
    let token = localStorage.getItem('vToken')
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      };

    const response = await fetch(url,requestOptions)
    const data = await response.json()
    return data.empleados
}