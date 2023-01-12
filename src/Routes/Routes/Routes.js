import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductCategory from "../../Pages/CameraCategory/CamerCategory";
import SignUp from "../../Pages/SignUp/SignUp";
import Products from "../../Pages/ProductCategory/Products";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import MyProducts from "../../Pages/AddProduct/MyProducts";
import MyOrders from "../../Component/Dashboard/BuyerDashboard/MyOrders/MyOrders";
import AllSellers from "../../Component/Dashboard/AdminDashboard/AllSellers/AllSellers";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import AllBuyers from "../../Component/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import Checkout from "../../Component/Dashboard/BuyerDashboard/Checkout/Checkout";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/product',
                element:<AddProduct></AddProduct>
            },
            {
                path:'/myproducts',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/cameraOptions',
                element:<ProductCategory></ProductCategory>,
                
            },
            {
                path: '/cameraOptions/:id',
                element:<Products></Products> ,
                loader: ({ params }) => fetch(`http://localhost:5000/cameraOptions/${params.id}`)
            },
        ]


    },
    {
        path:'/dashboard',
        element:<PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path:'/dashboard/my-orders',
                element:<BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/checkout/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/orders/${params.id}`),
                element: <Checkout></Checkout>
            },
            {
                path:'/dashboard/all-sellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path:'/dashboard/add-product',
                element:<SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path:'/dashboard/my-products',
                element:<SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path:'/dashboard/all-buyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
        ]
    }
])

export default router;