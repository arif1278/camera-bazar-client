import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error-page.png';

const ErrorPage = () => {
    return (
        <div className='w-screen h-screen relative'>
            <div className='flex flex-col justify-center items-center gap-3 text-center absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 bg-neutral-focus px-4 py-8 rounded-lg min-w-full md:min-w-fit'>
                <img src={error} alt="" className='w-20 md:w-auto' />
                <h1 className='text-5xl md:text-9xl font-bold'>404</h1>
                <h3 className='text-xl md:text-3xl font-semibold' >OOPS! NOTHING WAS FOUND</h3>
                <p className='text-base md:text-xl font-medium'>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <Link to='/'><button className='btn bg-base-300 hover:glass mt-4'>Return Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;