import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../Pages/Loader/Loader';
import ConfirmModal from '../../../ConfirmModal/ConfirmModal';


const AllSellers = () => {

    const [sellerInfo, setSellerInfo] = useState(null);

    // Get sellers data
    const { isLoading, data: sellers, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () =>
            axios.get('http://localhost:5000/users?role=seller', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
                }
            })
                .then(data => data.data)
    })

    // Delete seller
    const handleDelete = (data) => {
        const id = data._id;

        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Seller deleted!');
                    refetch();
                }
            })
    }

    // Verify seller
    const handleVerify = (email) => {
        fetch(`http://localhost:5000/users?email=${email}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller Verified!');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-medium pb-4'>All Sellers</h2>
            {
                isLoading ?
                    <Loader>Loading Sellers...</Loader>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className='text-base'>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className='text-center'>Verify</th>
                                    <th className='text-center'>Delete</th>
                                </tr>
                            </thead>
                            {
                                sellers.map((seller, i) =>
                                    <tbody key={seller._id}>
                                        <tr className='text-sm'>
                                            <th>{i + 1}</th>
                                            <td>{seller.name}</td>
                                            <td>{seller.email}</td>
                                            <td className='text-center py-0'>{seller?.status === 'verified' ? 'Verified' : <button onClick={() => handleVerify(seller.email)} className='btn btn-xs border-0 hover:glass'>Verify</button>}</td>
                                            <td className='text-center py-0'><label onClick={() => setSellerInfo(seller)} htmlFor="confirm-modal" className='btn btn-xs hover:glass'>Delete</label></td>
                                        </tr>
                                    </tbody>)
                            }
                        </table>
                        {
                            sellerInfo &&
                            <ConfirmModal modalData={sellerInfo} closeModal={setSellerInfo} confirm={handleDelete}>
                                <h3 className="font-bold text-lg">Delete Seller?</h3>
                                <p className="py-4"><span className='font-bold text-red-500'>"{sellerInfo.name}"</span> will be deleted permanently!</p>
                            </ConfirmModal>
                        }
                    </div>
            }
        </div>
    );
};

export default AllSellers;