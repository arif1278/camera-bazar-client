import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../Component/ConfirmModal/ConfirmModal';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loader from '../Loader/Loader';

const MyProducts = () => {

    const { userInfo } = useContext(AuthContext);
    const [productInfo, setProductInfo] = useState(null);

    // Get products data
    const { isLoading, data: products, refetch } = useQuery({
        queryKey: ['my-products', userInfo.email],
        queryFn: () =>
            axios.get(`http://localhost:5000/products/${userInfo.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
                }
            })
                .then(data => data.data)
    })

    // Update product data
    const handleAd = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Advertised!');
                    refetch();
                }
            })
            .catch(error => toast.error(error.message))
    }

    // Delete product
    const handleDelete = (product) => {
        const id = product._id;

        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Product deleted!');
                    refetch();
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-medium pb-4'>My Products</h2>
            {
                isLoading ?
                    <Loader>Loading Products...</Loader>
                    : products.length === 0 ?
                        <div className='text-center pt-6'>
                            <p className='text-xl font-medium pb-4'>No products found</p>
                            <Link to='/dashboard/add-product'><button className='btn bg-base-300 hover:glass'>Add Product</button></Link>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className='text-base'>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th className='text-center'>Price</th>
                                        <th className='text-center'>Status</th>
                                        <th className='text-center'>Advertise</th>
                                        <th className='text-center'>Delete</th>
                                    </tr>
                                </thead>
                                {
                                    products.map((product, i) =>
                                        <tbody key={product._id}>
                                            <tr className='text-sm'>
                                                <th>{i + 1}</th>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td className='text-center'>{product.resalePrice}</td>
                                                <td className='text-center'>{product?.status === 'sold' ? 'Sold' : 'Available'}</td>
                                                <td className='text-center py-0'>{product?.advertise ? 'Advertised' : product?.status === 'sold' ? '--' : <button onClick={() => handleAd(product._id)} className='btn btn-xs hover:glass'>Advertise</button>}</td>
                                                <td className='text-center py-0'><label onClick={() => setProductInfo(product)} htmlFor="confirm-modal" className='btn btn-xs hover:glass'>Delete</label></td>
                                            </tr>
                                        </tbody>)
                                }
                            </table>
                            {
                                productInfo &&
                                <ConfirmModal modalData={productInfo} closeModal={setProductInfo} confirm={handleDelete}>
                                    <h3 className="font-bold text-lg">Delete product?</h3>
                                    <p className="py-4"><span className='font-bold text-red-500'>"{productInfo.name}"</span> will be deleted permanently!</p>
                                </ConfirmModal>
                            }
                        </div>
            }
        </div>
    );
};

export default MyProducts;