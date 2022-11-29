import React from 'react';

const AdvertisedProductCard = ({ product, setBookProduct }) => {

    const { name, image, resalePrice, category, condition, location } = product;

    return (
        <div className="card group card-compact bg-base-200">
            <figure><img src={image} alt={name} className='w-full max-h-72 object-cover group-hover:scale-110 duration-500' /></figure>
            <div className="card-body gap-1">
                <div className='flex justify-between text-base font-bold'>
                    <h2>{name}</h2>
                    <p className='text-end'>$ {resalePrice}</p>
                </div>
                <div className='relative mt-2'>
                    <div className='opacity-100 transition-all group-hover:opacity-0 absolute  translate-y-0 transform group-hover:translate-y-8'>
                        <p>Condition: {condition}</p>
                        <div className="card-actions mt-2">
                            <div className="badge badge-outline">{category}</div>
                            <div className="badge badge-outline">{location}</div>
                        </div>
                    </div>
                    <label onClick={() => setBookProduct(product)} htmlFor="booking-modal" className='btn bg-base-300 border-0 w-full translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:glass'>View Details</label>
                </div>
            </div>
        </div>
    );
};

export default AdvertisedProductCard;