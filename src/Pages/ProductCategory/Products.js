import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductDetails from './ProductDetails';

const Products = () => {
  const products = useLoaderData();
  const [product,setProduct]=useState(null);


  return (
    <div className='mx-auto'>
      <h2 className='text-center'>Product</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>

        {
          products?.map(product => <ProductDetails
            key={product._id}
            product={product}
            setProduct={setProduct}
          ></ProductDetails>)
        };



      </div>
      {
        product &&
        <BookingModal
        product={product}
        setProduct={setProduct}
        ></BookingModal>
  
      }
    </div>
  );
};

export default Products;