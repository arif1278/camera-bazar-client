import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import FormLoader from '../FormLoader/FormLoader';

const BookingModal = ({ product,setProduct,refetch }) => {

    const { _id, name, resalePrice, sellerEmail, image } = product;
    const { userInfo } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [formLoading, setFormLoading] = useState(false);

    // Post booking/order
    const handleForm = (data) => {
        setFormLoading(true);
        const date = format(new Date(), 'PPPpp');

        const order = {
            productId: _id,
            product: name,
            price: resalePrice,
            image,
            buyerName: userInfo.displayName,
            buyerEmail: userInfo.email,
            buyerPhone: data.phone,
            sellerEmail,
            purchaseDate: date,
            location: data.location,
            status: 'unpaid'
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setProduct(null);
                    toast.success('Product Booked.');
                }
                if (data.message) {
                    toast.error(data.message);
                    setProduct(null);
                }
            })
            .catch(error => toast.error(error.message))
            .finally(() => setFormLoading(false))
    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <label htmlFor="booking-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    {
                        formLoading && <FormLoader>Booking Product...</FormLoader>
                    }
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 pt-1">✕</label>
                    <div className='max-w-md mx-2'>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <p className='flex items-center text-lg' >Price: $ {resalePrice}</p>
                    </div>
                    {
                        userInfo && userInfo.email ?
                            <form onSubmit={handleSubmit(handleForm)} className='max-w-md pt-4 rounded-lg flex flex-col gap-4 flex-1 mx-auto'>
                                <input value={userInfo?.displayName} className="input input-bordered w-full input-disabled" readOnly />
                                <input value={userInfo?.email} className="input input-bordered w-full input-disabled" readOnly />
                                <input {...register('phone')} type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
                                <input {...register('location')} type="text" placeholder="Location" className="input input-bordered w-full" required />
                                <button type='submit' className='btn bg-base-300 hover:glass'>Book</button>
                            </form>
                            :
                            <div className='pt-4'>
                                <Link to='/login'><button className='btn bg-base-300 hover:glass' disabled={formLoading}>Login to Book</button></Link>
                            </div>
                    }
                </label>
            </label>
        </div>
    );
};

export default BookingModal;