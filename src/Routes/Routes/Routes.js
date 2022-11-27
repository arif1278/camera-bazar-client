import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductCategory from "../../Pages/CameraCategory/CamerCategory";
import SignUp from "../../Pages/SignUp/SignUp";
import Products from "../../Pages/ProductCategory/Products";
import Dashbord from "../../Pages/Dashboard/Dashboard/Dashbord";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import DashboardLayout from "../../Layout/DashboardLayout";


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
                element:<Dashbord></Dashbord>
            }
        ]
    }
])

export default router;