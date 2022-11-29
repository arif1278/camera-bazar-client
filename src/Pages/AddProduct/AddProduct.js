import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AddProduct = () => {

    const handleAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const condition = form.condition.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const productCategory = form.productCategory.value;
        const description = form.description.value;
        const yearOfPurchase = form.yearOfPurchase.value;

        const addProduct = {
            name,
            price,
            condition,
            phone,
            location,
            productCategory,
            description,
            yearOfPurchase
        }

        fetch('http://localhost:5000/addproducts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
               if(data.acknowledged){
                // setAddproduct(null);
                toast.success('Added product successfully')
               }
            })


       

    }
    return (
        <div>
            <div className="modal-box mx-auto w-full">
                <h3 className="text-lg text-center font-bold">Add Product</h3>
                <form onSubmit={handleAddProduct} className='grid grid-cols-1 gap-2 mt-6'>
                    <input type="text" placeholder="productName" className="input input-bordered w-full" />
                    <input type="text" name='price'  placeholder="price" className="input input-bordered w-full" />
                    <input type="text" name='condition' placeholder="condition" className="input input-bordered w-full" />
                    <input type="text" name='phone' placeholder="phone" className="input input-bordered w-full" />
                    <input type="text" name='location' placeholder="location" className="input input-bordered w-full" />
                    <input type="text" name='productCategory' placeholder="productcategory" className="input input-bordered w-full" />
                    <input type="text" name='yearOfPurchase' placeholder="yearOfPurchase" className="input input-bordered w-full" />
                    <textarea className="textarea textarea-bordered" name='description' placeholder="description"></textarea>
                    <br />
                    <Link to='/myproducts'><input className='btn eccent w-full ' type="submit" value="Submit" /></Link>
                </form>
            </div>
        </div>

    );
};

export default AddProduct;