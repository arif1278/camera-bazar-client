import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useRole from '../../Hooks/useRole';

const AdminRoute = ({ children }) => {

    const { userInfo, userLoading, signOutUser } = useContext(AuthContext);
    const location = useLocation();
    const [role, roleLoading] = useRole(userInfo?.email)

    if (userLoading || roleLoading) {
        return <Loader>Logging in...</Loader>
    }

    if (userInfo && userInfo?.email && role === 'admin') {
        return children;
    }

    signOutUser()
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;