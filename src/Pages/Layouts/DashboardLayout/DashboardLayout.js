import React, { useContext, useState } from 'react';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { RiCloseFill, RiDashboardFill } from "react-icons/ri";
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const DashboardLayout = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userInfo } = useContext(AuthContext);

    return (
        <div className='container mx-auto max-w-screen-xl'>
            <Navbar></Navbar>

            {/* Dashboard menu toggler */}
            <div className='lg:hidden px-2 mb-1'>
                <label onClick={() => setIsMenuOpen(!isMenuOpen)} htmlFor="dashboard-drawer" className="btn btn-ghost text-right">{
                    isMenuOpen ?
                        <><RiCloseFill className="inline-block w-6 h-6 stroke-current"></RiCloseFill><span className='pt-1 pl-2'>Close Menu</span></>
                        :
                        <><RiDashboardFill className="inline-block w-6 h-6 stroke-current"></RiDashboardFill><span className='pt-1 pl-2'>Open Menu</span></>
                }</label>
            </div>
            <div className="drawer drawer-mobile bg-neutral-focus lg:mt-10">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4 pt-6">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label onClick={() => setIsMenuOpen(!isMenuOpen)} htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined} end>Dashboard</NavLink></li>

                        {/* Admin dashboard */}
                        {
                            (userInfo?.role === 'admin') &&
                            <>
                                <li><NavLink to='/dashboard/all-sellers' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined} end>All Sellers</NavLink></li>
                                <li><NavLink to='/dashboard/all-buyers' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined} end>All Buyers</NavLink></li>
                                <li><NavLink to='/dashboard/reported-products' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined} end>Reported Products</NavLink></li>
                            </>
                        }

                        {/* Seller dashboard */}
                        {
                            (userInfo?.role === 'seller') &&
                            <>
                                <li><NavLink to='/dashboard/my-products' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined}>My Products</NavLink></li>
                                <li><NavLink to='/dashboard/add-product' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined}>Add Product</NavLink></li>
                            </>
                        }

                        {/* Buyer dashboard */}
                        {
                            (userInfo?.role === 'buyer') &&
                            <>
                                <li><NavLink to='/dashboard/my-orders' className={({ isActive }) => isActive ? 'bg-neutral-focus text-white' : undefined}>My Orders</NavLink></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default DashboardLayout;