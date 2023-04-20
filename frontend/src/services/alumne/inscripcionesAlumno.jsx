const url = `${import.meta.env.VITE_URL}/estudiante/verInscripciones`;

export async function misInscripciones() {
    let token = localStorage.getItem('vToken')
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      };

      const response = await fetch(url, requestOptions)
      const data = await response.json()
      //console.log(data.ofertasInscritas)
      return data.ofertasInscritas
}