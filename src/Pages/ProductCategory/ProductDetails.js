import React from 'react';
import { Helmet } from 'react-helmet';

const ProductDetails = ({ product,setProduct }) => {
    const { name, image,sellerName,number,resalePrice,originalPrice,uses,location
,time    } = product;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <Helmet><title>Cameras - Camerabazar</title></Helmet>
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <p className="card-title">Brand Model: {name}</p>
                <p className="card-title">Seller Name: {sellerName}</p>
                <p className="card-title">Phone: {number}</p>
                <p className="card-title">ResalePrice: {resalePrice}</p>
                <p className="card-title">Original Price: {originalPrice}</p>
                <p className="card-title">Uses: {uses}</p>
                <p className="card-title">Location: {location}</p>
                <p className="card-title">Time: {time}</p>
                <div className="card-actions">
                    <label htmlFor="booking-modal"
                     className="btn btn-primary text-white"
                     onClick={()=>setProduct(product)}
                     >Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;