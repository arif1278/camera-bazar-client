import React, { useState } from 'react';
import BookingModal from '../../BookingModal/BookingModal';
import AdvertisedProductCard from './AdvertisedProductCard';

const AdvertisedProducts = ({ advertisedProducts, refetch }) => {

    const [bookProduct, setBookProduct] = useState(null);

    return (
        <div className='container mx-auto max-w-screen-xl px-2 md:px-4 xl:px-0'>
            <h2 className='text-2xl font-bold'>Advertised Products</h2>
            <div className='divider bg-neutral-content h-0.5 opacity-50 mt-2 mb-6'></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    advertisedProducts.map(product => <AdvertisedProductCard key={product._id} product={product} setBookProduct={setBookProduct}></AdvertisedProductCard>)
                }
            </div>
            {
                bookProduct &&
                <BookingModal bookProduct={bookProduct} setBookProduct={setBookProduct} refetch={refetch}></BookingModal>
            }
        </div>
    );
};

export default AdvertisedProducts;