import React, { useContext } from 'react';
import { Navigate , Outlet} from 'react-router-dom';
import { AuthContext } from '../context/Autenticate';

const RoleProtectedComponent = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet/>;
  } else {
    return <Navigate to="/" />;
  }
};

export default RoleProtectedComponent;
