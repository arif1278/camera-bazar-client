import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiLoaderFill } from 'react-icons/ri';

const CheckoutForm = ({ order }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const { price: originalPrice, buyerName, buyerEmail, _id, productId, sellerEmail } = order;
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const price = parseFloat(originalPrice);

    // Get client secret
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
            .catch(error => console.log(error))
    }, [price])

    // Handle stripe payment
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (paymentMethod.error) {
            setPaymentError(paymentMethod.error.message);
            return;
        } else {
            setPaymentError('')
        }

        setPaymentProcessing(true);

        const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: buyerName,
                    email: buyerEmail
                }
            }
        })

        if (paymentIntent.error) {
            setPaymentError(`Payment failed ${paymentIntent.error.message}`);
            setPaymentProcessing(false);
            return;
        }

        if (paymentIntent.paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.paymentIntent.id;
            const payment = {
                buyerName,
                buyerEmail,
                sellerEmail,
                price: originalPrice,
                orderId: _id,
                productId,
                transactionId
            }

            // Post payment
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('camerabazarsecrettoken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setPaymentSuccess(transactionId);
                        toast.success('Payment Confirmed.')
                    }
                })
                .catch(error => toast.error(error.message))
        }
        setPaymentProcessing(false);

    }

    return (
        <div className='max-w-md mx-auto mt-12'>
            <form onSubmit={handleSubmit}>
                <p className='text-left text-sm mb-2 font-bold'>Card Details : </p>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#DCA54C',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} className='mb-8 border-[1px] border-amber-400 rounded p-4'></CardElement>
                <button type='submit' disabled={!stripe || !elements || paymentProcessing} className='btn btn-wide bg-base-300 hover:glass'>Pay</button>
            </form>
            {
                paymentError &&
                <p className='text-sm text-red-500 mt-4'>{paymentError}</p>
            }
            {
                paymentSuccess &&
                <p className='text-sm mt-4'>Payment successful. Your Transaction ID is : <span className='text-green-500 '>{paymentSuccess}</span></p>
            }
            {
                paymentProcessing &&
                <div className='flex items-center gap-2 justify-center text-amber-300 mt-4'><p className='animate-pulse'>Processing</p><RiLoaderFill className='animate-spin'></RiLoaderFill></div>
            }
        </div>
    );
};

export default CheckoutForm;