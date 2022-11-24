import React from 'react';
import Banner from '../Banner/Banner';
import ProccessSelling from '../ProccessSelling/ProccessSelling';

const Home = () => {
    return (
        <div className='mx-6'>
            <Banner></Banner>

            <ProccessSelling></ProccessSelling>
        </div>
    );
};

export default Home;