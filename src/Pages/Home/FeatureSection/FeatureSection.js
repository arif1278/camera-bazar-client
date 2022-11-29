import React from 'react';

const FeatureSection = () => {
    return (
        <section className='container mx-auto max-w-screen-xl px-2 md:px-4 xl:px-0 my-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 relative'>
                <div className="card bg-base-100 shadow-xl h-60 bg-feature-watches bg-no-repeat bg-cover bg-center">
                    <div className='absolute inset-0 bg-gradient-to-b from-base-100/90 to-base-100/0'></div>
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-amber-300 relative opacity-100">Large Selection of Watches</h2>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl h-60 bg-stripe bg-no-repeat bg-cover bg-top">
                    <div className='absolute inset-0 bg-gradient-to-b from-base-100/90 to-base-100/0'></div>
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-amber-300 relative opacity-100">Secure Payment with Stripe!</h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;