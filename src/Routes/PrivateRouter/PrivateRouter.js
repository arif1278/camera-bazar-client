// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

// const PrivateRouter = ({children}) => {
//     const {user,loading}=useContext(AuthContext);
//     const location=useLocation();
//     if(loading){
//         return <progress className='progress w-56'></progress>
//     }

//     if(user){
//         return children;
//     }

//    return  <Navigate to='/login' state={{from:location}} replace></Navigate>
// };

// export default PrivateRouter;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loader from '../../Pages/Loader/Loader';

const PrivateRoute = ({ children }) => {

    const { userInfo, userLoading } = useContext(AuthContext);
    const location = useLocation();

    if (userLoading) {
        return <Loader>Logging in...</Loader>
    }

    if (userInfo && userInfo?.email) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;