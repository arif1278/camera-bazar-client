import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                   <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                       
                        <li><Link to="/dashboard">My orders</Link></li>
                        <li><Link to="/dashboard/allseller">My products</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;