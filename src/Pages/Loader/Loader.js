import React from 'react';
import { RiLoaderFill } from 'react-icons/ri';

const Loader = ({ children }) => {
    return (
        <div className='container mx-auto max-w-screen-xl font-semibold text-center relative w-full h-[50vh]'>
            <div className='flex justify-center items-center gap-3 text-xl font-bold text-amber-300 absolute inset-0'>
                <RiLoaderFill className='text-3xl animate-spin'></RiLoaderFill>
                <p className='animate-pulse pt-1'>{children}</p>
            </div>
        </div>
    );
};

export default Loader;