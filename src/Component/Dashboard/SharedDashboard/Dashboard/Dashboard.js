import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';

const Dashboard = () => {

    const { userInfo } = useContext(AuthContext);

    return (
        <div className='text-center flex flex-col gap-5'>
            <Helmet><title>Dashboard - Cadence</title></Helmet>
            <h2 className='text-2xl font-medium pb-4'>Welcome {userInfo.displayName}</h2>
            <p className='text-xl'>Use the dashboard menu to navigate</p>
            <div>
                <p>Email: {userInfo.email}</p>
                <p className='capitalize'>Role: {userInfo?.role}</p>
            </div>
        </div>
    );
};

export default Dashboard;