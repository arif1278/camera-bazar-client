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
import MyOrder from "../../Pages/Dashboard/MyOrder/MyOrder";
import AllSeller from "../../Pages/Dashboard/AllSellers/AllSeller";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import MyProducts from "../../Pages/AddProduct/MyProducts";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
        children:[
            {
                path:'/dashboard',
                element:<MyOrder></MyOrder>
            },
            {
                path:'/dashboard/allseller',
                element:<AllSeller></AllSeller>
            },
        ]
    }
])

export default router;