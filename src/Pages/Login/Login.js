import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


const Login = () => {
    const { register,formState:{errors}, handleSubmit } = useForm();
    const {signIn,googleLogIn}=useContext(AuthContext);
    const [loginError,setLoginError]=useState('');
    const location=useLocation();
    const navigate=useNavigate();


    const from=location.state?.from?.pathname || '/';

    const handleGoogle=()=>{
          googleLogIn()
          .then((result)=>{
            setLoginError('');
            console.log(result.user);
            navigate(from,{replace:true});
          })
    }

    const handleLogin=data=>{
        console.log(data);
        setLoginError('');
        signIn(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user);
        })
        .catch(error =>{
            console.log(error.message)
            setLoginError(error.message)
        });
        setLoginError('');
        navigate(from,{replace:true});
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-8'>
                <h1 className='text-4xl text-center'>login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span> </label>
                        <input type="text"
                         {...register("email",{
                            required: "Email Address is required" 
                        })} 
                         className="input input-bordered w-full max-w-xs" /><input />
                         {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span> </label>
                        <input type="password" 
                        {...register("password",{
                            required:"password is required",
                            minLength:{value:6,message:'password must be 6 characters or longer'}
                        })}
                         className="input input-bordered w-full max-w-xs" /><input />
                        
                        <label className="label"> <span className="label-text">forget Password</span> </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    
                    
                    <input className='btn btn-accent w-full' type="submit" />
                    <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                    </div>
                </form>
                <p>
                    New to camera bazrar <Link className='text-secondary' to='/signup'>Create an account</Link> 
                    <div className="divider">OR</div>
                    <button onClick={handleGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </p>
            </div>
        </div>
    );
};

export default Login;