import { useState, useEffect } from 'react';
import axios from 'axios';

export function OfertasInscrito() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await axios.get('/verOfertasInscrito');
        setOfertas(response.data.ofertasInscritas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfertas();
  }, []);

  return (
    <div>
      <h2>Ofertas en las que estás inscrito:</h2>
      {ofertas.length > 0 ? (
        <ul>
          {ofertas.map((oferta) => (
            <li key={oferta._id}>{oferta.refOfertaLaboral.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>No estás inscrito en ninguna oferta</p>
      )}
    </div>
  );
}

