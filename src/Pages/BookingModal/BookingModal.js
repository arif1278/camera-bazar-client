import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const BookingModal = ({ product, setProduct }) => {
    const { name, resalePrice } = product;
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const pname = form.pname.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            name,
            resalePrice,
            pname,
            email,
            phone,
            location
        }

        fetch('http://localhost:5000/cameraOptions', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
               if(data.acknowledged){
                setProduct(null);
                toast.success('Booking confirmed')
               }
            })

    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 mt-6'>
                        <input type="text" disabled value={name} placeholder="productName" className="input input-bordered w-full" />
                        <input type="text" disabled value={resalePrice} placeholder="price" className="input input-bordered w-full" />
                        <input type="text" name='pname' defaultValue={user?.displayName} disabled placeholder="name" className="input input-bordered w-full" />
                        <input type="email" name='email' defaultValue={user?.email} disabled placeholder="email" className="input input-bordered w-full" />
                        <input type="text" name='location' placeholder="location" className="input input-bordered w-full" />
                        <input type="text" name='phone' placeholder="phone" className="input input-bordered w-full" />
                        <br />
                        <input className='btn eccent w-full ' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;