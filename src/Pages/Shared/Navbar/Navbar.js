import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Navbar = () => {

  const { userInfo, setUserInfo, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
      signOutUser()
          .then(() => {
              setUserInfo(null);
              toast.success("Logged out successfully.");
              navigate('/');
          })
          .catch(error => toast.error(error.message))
  }
  const menuItem = <React.Fragment>
    <li><Link to="/">Home</Link></li>
    {/* <li><Link to="/product">Add Product</Link></li> */}
    <li><Link to="/blog">Blog</Link></li>
    {
      userInfo && userInfo.uid ?
      <>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><button onClick={handleLogOut}>Sign out</button></li>
      </>
     : <li><Link to="/login">Login</Link></li>
    }
  </React.Fragment>
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
           {menuItem}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">Camera Bazar</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
         {menuItem}
        </ul>
      </div>
      <label htmlFor='drawer' tabIndex={2} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
    </div>
  );
};

export default Navbar;