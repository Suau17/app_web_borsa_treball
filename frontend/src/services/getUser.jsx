

export async function GetUser(id) {
  
  const url = `${import.meta.env.VITE_URL}/app/user/${id}`;
  console.log(url)
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, requestOptions)
      const data = await response.json()
      console.log(data)
      return data
}