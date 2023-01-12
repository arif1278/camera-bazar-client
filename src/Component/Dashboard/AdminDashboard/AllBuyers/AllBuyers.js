import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../Pages/Loader/Loader';
import ConfirmModal from '../../../ConfirmModal/ConfirmModal';

const AllBuyers = () => {

    const [buyerInfo, setBuyerInfo] = useState(null);

    // Get buyers data
    const { isLoading, data: buyers, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () =>
            axios.get('http://localhost:5000/users?role=buyer', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('cadenceSecretToken')}`
                }
            })
                .then(data => data.data)
    })

    // Delete buyer
    const handleDelete = (data) => {
        const id = data._id;
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('cadenceSecretToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Buyer deleted!');
                    refetch();
                }
            })
    }


    return (
        <div>
            <h2 className='text-center text-2xl font-medium pb-4'>All Buyers</h2>
            {
                isLoading ?
                    <Loader>Loading Buyers...</Loader>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className='text-base'>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className='text-center'>Delete</th>
                                </tr>
                            </thead>
                            {
                                buyers.map((buyer, i) =>
                                    <tbody key={buyer._id}>
                                        <tr className='text-sm'>
                                            <th>{i + 1}</th>
                                            <td>{buyer.name}</td>
                                            <td>{buyer.email}</td>
                                            <td className='text-center py-0'><label onClick={() => setBuyerInfo(buyer)} htmlFor="confirm-modal" className='btn btn-xs hover:glass'>Delete</label></td>
                                        </tr>
                                    </tbody>)
                            }
                        </table>
                        {
                            buyerInfo &&
                            <ConfirmModal modalData={buyerInfo} closeModal={setBuyerInfo} confirm={handleDelete}>
                                <h3 className="font-bold text-lg">Delete Buyer?</h3>
                                <p className="py-4"><span className='font-bold text-red-500'>"{buyerInfo.name}"</span> will be deleted permanently!</p>
                            </ConfirmModal>
                        }
                    </div>
            }
        </div>
    );
};

export default AllBuyers;