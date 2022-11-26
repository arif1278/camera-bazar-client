import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Products = () => {
    const products=useLoaderData();
    console.log(products);
    return (
        <div>
      <h2 className='text-center'>Category {products?.length}</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        {
            products?.map(product => <ProductDetails
            key={product._id}
            product={product}
          ></ProductDetails>)
        };



      </div>

    </div>
    );
};

export default Products;