import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import GoogleSignIn from '../../firebase/GoogleSignIn';
import FormLoader from '../FormLoader/FormLoader';
import useToken from '../Hooks/useToken';
const Login = () => {

    const { signInWithEmail, setUserInfo, setUserLoading } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    const [formLoading, setFormLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            setRedirect(false);
            navigate(from, { replace: true });
        }
    }, [ token, from, navigate])

    // Handle login
    const handleForm = (data) => {
        setFormLoading(true);
        const email = data.email;
        const password = data.password;

        signInWithEmail(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setRedirect(true);
                fetch(`http://localhost:5000/users?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.role) {
                            const role = data.role;
                            const currentUser = { ...user, role };
                            setUserInfo(currentUser);
                            setLoginEmail(user.email);
                            toast.success('Logged in successfully.');
                        }
                    })
                    .catch(error => toast.error(error.message))
            })
            .catch(error => toast.error(error.message))
            .finally(() => {
                setUserLoading(false);
                setFormLoading(false);
            })
    }

    return (
        <div className='container mx-auto max-w-screen-xl px-2 md:px-4 xl:px-0 flex justify-center mt-20'>
            
            <div className='max-w-md p-6 border border-neutral-content rounded-lg flex-1 relative'>
                {
                    formLoading && <FormLoader>Logging in...</FormLoader>
                }
                {
                    redirect && <FormLoader>Redirecting...</FormLoader>
                }
                <>
                    <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-4'>
                        <h1 className='text-2xl font-medium text-center'>Login</h1>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input {...register('email')} type="email" placeholder="Your Email" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input {...register('password')} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        </div>
                        <button className='btn btn-neutral-content hover:glass border-0 mt-4' disabled={formLoading}>Login</button>
                        <p className='text-sm text-center'>Don't Have an Account? <Link to='/signup' className='font-bold text-base hover:underline'>Register</Link></p>
                    </form>
                    <div className="divider">OR</div>
                    <GoogleSignIn from={from} setFormLoading={setFormLoading} formLoading={formLoading} setRedirect={setRedirect}></GoogleSignIn>
                </>
            </div>
        </div>
    );
};

export default Login;