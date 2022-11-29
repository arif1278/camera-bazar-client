import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';

const Product = () => {
  const {addProducts,setAddProducts}=useState();

useEffect(()=>{
  fetch('http://localhost:5000/addproduct')
  .then(res=>res.json())
  .then(data=>setAddProducts(data));
},[])

  return (
    <div>
      {
      addProducts.map(addProduct=><AddProduct
      key={addProduct._id}
      addProduct={addProduct}
      setAddProducts={setAddProducts}
      ></AddProduct>)
      }
    </div>

    
  );
};

export default Product;