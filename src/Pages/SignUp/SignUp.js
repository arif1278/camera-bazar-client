import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import GoogleSignIn from '../../firebase/GoogleSignIn';
import FormLoader from '../FormLoader/FormLoader';
import useToken from '../Hooks/useToken';

const SignUp = () => {
    const { createUser, setUserInfo, updateUserProfile, setUserLoading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            setRedirect(false);
            navigate('/');
        }
    }, [token, navigate])

    const handleForm = (data) => {
        setFormLoading(true);
        const name = data.name;
        const email = data.email.toLowerCase();
        const password = data.password;
        const role = data.role;
        const displayName = name;

        createUser(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                const currentUser = { ...user, role, displayName };
                const profile = { displayName: name };
                setRedirect(true);
                updateUserProfile(profile)
                    .then(() => {
                        saveUserInfo(name, email, role);
                        setUserInfo(currentUser);
                    })
                    .catch(error => toast.error(error.message))
            })
            .catch(error => toast.error(error.message))
            .finally(() => {
                setUserLoading(false);
                setFormLoading(false);
            })
    }


    const saveUserInfo = (name, email, role) => {
        const user = {
            name,
            email,
            role
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoginEmail(email);
                    toast.success('Registered successfully.');
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <div className='container mx-auto max-w-screen-xl px-2 md:px-4 xl:px-0 flex justify-center mt-20'>
            
            <div className='max-w-md p-6 border border-neutral-content rounded-lg flex-1 relative'>
                {
                    formLoading && <FormLoader>Registering...</FormLoader>
                }
                {
                    redirect && <FormLoader>Redirecting...</FormLoader>
                }
                <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-medium text-center'>Register</h1>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input {...register('name')} type="text" placeholder="Your Full Name" className="input input-bordered border-2 w-full" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input {...register('email')} type="email" placeholder="Your Email" className="input input-bordered border-2 w-full" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input {...register('password', {
                            required: 'Password is required.',
                            minLength: {
                                value: 6,
                                message: 'Password must be 6 characters long.'
                            },
                            pattern: {
                                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: 'Password must contain a Uppercase, Lowercase and a digit.'
                            }

                        })} type="password" placeholder="Your Password" className="input input-bordered border-2 w-full" required />
                    </div>
                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text font-medium">What do you want to do?</span>
                        </label>
                        <select {...register('role')} className="select select-bordered border-2 w-full" required>
                            <option value='buyer'>Buyer ( I want to buy )</option>
                            <option value='seller'>Seller ( I want to sell )</option>
                        </select>
                    </div>
                    {
                        errors.password && <p className='text-sm text-red-500'>{errors.password?.message}</p>
                    }
                    <button type='submit' className='btn btn-neutral-content hover:glass border-0 mt-2' disabled={formLoading}>Register</button>
                    <p className='text-sm text-center'>Already Have an Account? <Link to='/login' className='font-bold text-base hover:underline'>Login</Link></p>
                </form>
                <div className="divider">OR</div>
                <GoogleSignIn setFormLoading={setFormLoading} formLoading={formLoading} setRedirect={setRedirect}></GoogleSignIn>
            </div>
        </div>
    );
};

export default SignUp;