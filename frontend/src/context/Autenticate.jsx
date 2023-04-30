import React, { useEffect, useState } from 'react';
import { getCookie } from './cookies';

const AuthContext = React.createContext();

// Este contexto estará presente en Main.jsx y en el componente personalizado RoleProtectedRoute
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // Aquí, asumimos que la función getUserRole() devuelve el rol del usuario actual
    useEffect(() => {
        const getUserRole = async () => {
            // Obtén el rol del usuario y actualiza el estado
            const role = getCookie('vRole')
            setUser({ role });
            setLoading(false);
        };

        getUserRole();
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};
