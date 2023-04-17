const url = `${import.meta.env.VITE_URL}/admin/ciclo/register`;

export async function registerCiclo(){

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
    };

    const response = await request(url, requestOptions)
    const data = await response.json()
    return data;
}