import React from 'react';
import { RiLoaderFill } from 'react-icons/ri';

const FormLoader = ({ children }) => {
    return (
        <div className='absolute bg-neutral-focus/80 w-full h-full top-0 left-0 rounded-lg flex justify-center items-center gap-3 text-xl font-bold text-amber-300'>
            <RiLoaderFill className='text-3xl animate-spin'></RiLoaderFill>
            <p className='animate-pulse pt-1'>{children}</p>
        </div>
    );
};

export default FormLoader;