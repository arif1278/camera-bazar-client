import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';
import Loader from '../../../../Pages/Loader/Loader';

const MyOrders = () => {

    const { userInfo } = useContext(AuthContext);

    // Get orders data
    const { isLoading, data: orders } = useQuery({
        queryKey: ['orders', userInfo.email],
        queryFn: () =>
            axios.get(`http://localhost:5000/orders?email=${userInfo.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
                }
            })
                .then(data => data.data)
    })

    return (
        <div>
           
            <h2 className='text-center text-2xl font-medium pb-4'>My Orders</h2>
            {
                isLoading ?
                    <Loader>Loading Orders...</Loader>
                    : orders.length === 0 ?
                        <div className='text-center pt-6'>
                            <p className='text-xl font-medium pb-4'>No orders found</p>
                            <Link to='/'><button className='btn bg-base-300 hover:glass'>Book Product</button></Link>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className='text-base'>
                                    <tr>
                                        <th>No.</th>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th className='text-center'>Price</th>
                                        <th className='text-center'>Pay</th>
                                    </tr>
                                </thead>
                                {
                                    orders.map((order, i) =>
                                        <tbody key={order._id}>
                                            <tr className='text-sm'>
                                                <th>{i + 1}</th>
                                                <td className='py-2'>
                                                    <div className="avatar">
                                                        <div className="w-10 h-10 rounded-full">
                                                            <img src={order.image} alt="" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{order.product}</td>
                                                <td className='text-center'>{order.price}</td>
                                                <td className='text-center py-0'>{order.status === 'paid' ? 'Paid' : <Link to={`/dashboard/checkout/${order._id}`}><button className='btn btn-sm border-0 pt-1 hover:glass'>Pay</button></Link>}</td>
                                            </tr>
                                        </tbody>)
                                }
                            </table>
                        </div>
            }
        </div>
    );
};

export default MyOrders;