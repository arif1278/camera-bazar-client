import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [userRole,setUserRole]=useState();
    const navigate = useNavigate();


    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/');
                toast('User Created Successfully.')

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email,data.role);
                    })

                    .catch(err => console.log(err));

            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message)
            });
    }

    const saveUser = (name, email,role) => {
        const user = { name, email,role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log('saveuser', data));

        navigate('/');

    }




    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-8'>
                <h1 className='text-4xl text-center'>signUp</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='account option'>
                        <label className='label p-1'>
                            <span className='label-text'>Choose an option</span>

                        </label>
                        <select {...register("role")}
                        className='select select-bordered w-full max-w-xs'
                        >
                            <option>Select an Option</option>
                            <option value="Buyer"
                            onChange={(event)=>setUserRole(event.target.value)}
                            >Buyer</option>
                            <option value="Seller"
                            onChange={(event)=>setUserRole(event.target.value)}
                            >Seller</option>
                        </select>

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span> </label>
                        <input type="text" {...register("name", {
                            required: "name is required"
                        })} className="input input-bordered w-full max-w-xs" /><input />
                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span> </label>
                        <input type="text" {...register("email", {
                            required: "email is required"
                        })} className="input input-bordered w-full max-w-xs" /><input />
                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span> </label>
                        <input type="password" {...register("password", {
                            required: "password is required",
                            minLength: { value: 6, message: "password must be use 6 characters or long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must be strong' }
                        })} className="input input-bordered w-full max-w-xs" /><input />
                        {errors.password && <span className='text-red-600'>{
                            errors.password.message}</span>}
                    </div>
                    <input className='btn btn-accent w-full' type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    {userRole && <p className='text-red-600'>{userRole}</p>}
                </form>
                <p>
                    allready have an account <Link className='text-secondary' to='/login'>please login</Link>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;