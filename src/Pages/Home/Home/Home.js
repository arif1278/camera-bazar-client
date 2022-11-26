import React from 'react';
import ProductCategory from '../../CameraCategory/CamerCategory';
import Banner from '../Banner/Banner';
import ProccessSelling from '../ProccessSelling/ProccessSelling';

const Home = () => {
    return (
        <div className='mx-6'>
            <Banner></Banner>
             <ProductCategory></ProductCategory>
            <ProccessSelling></ProccessSelling>
        </div>
    );
};

export default Home;