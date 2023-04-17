const url = `${import.meta.env.VITE_URL}/gestor/empresa/empleados`

export async function getEmployees() {
    let token = localStorage.getItem('vToken')
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      };

    const response = await fetch(url,requestOptions)
    const data = await response.json()
    return data.empleados
}