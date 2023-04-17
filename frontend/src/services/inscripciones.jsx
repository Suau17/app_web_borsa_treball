

export async function GetInscripciones(id) {
    const url = `${import.meta.env.VITE_URL}/app/oferta/${id}/inscripciones`
    console.log(url)
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data.inscripciones
}