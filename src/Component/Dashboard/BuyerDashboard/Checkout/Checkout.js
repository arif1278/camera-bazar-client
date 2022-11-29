import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_pk)

const Checkout = () => {

    const order = useLoaderData();

    return (
        <div>
            <Helmet><title>Checkout - Cadence</title></Helmet>
            <div className='text-center'>
                <h2 className='text-2xl font-medium pb-4'>Checkout your product</h2>
                <p>Use the dashboard menu to navigate</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;