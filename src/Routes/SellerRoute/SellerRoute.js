import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useRole from '../../Pages/Hooks/useRole';
import Loader from '../../Pages/Loader/Loader';

const SellerRoute = ({ children }) => {

    const { userInfo, userLoading, signOutUser } = useContext(AuthContext);
    const location = useLocation();
    const [role, roleLoading] = useRole(userInfo?.email)

    if (userLoading || roleLoading) {
        return <Loader>Logging in...</Loader>
    }

    if (userInfo && userInfo?.email && role === 'seller') {
        return children;
    }

    signOutUser()
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;