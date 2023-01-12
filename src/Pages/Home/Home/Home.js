import React from 'react';
import { Helmet } from 'react-helmet';
import ProductCategory from '../../CameraCategory/CamerCategory';
import Banner from '../Banner/Banner';
import ProccessSelling from '../ProccessSelling/ProccessSelling';
import TestimonialSection from '../TestimonialSection/TestimonialSection';

const Home = () => {
    return (
        <div className='mx-6'>
            <Helmet><title>Home - Camerabazar</title></Helmet>
            <Banner></Banner>
             <ProductCategory></ProductCategory>
            <ProccessSelling></ProccessSelling>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;