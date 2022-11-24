import React from 'react';
import { useLoaderData } from 'react-router-dom';



const ProductCategory=()=>{
    const product=useLoaderData();
    

    return(
        <div>
           <h2 className='text-4xl'>Product Category: {product?.length}</h2>

          <div>
            {

            }
          </div>

        </div>
    );
};
export default ProductCategory;