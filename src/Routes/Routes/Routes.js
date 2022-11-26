import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductCategory from "../../Pages/CameraCategory/CamerCategory";
import SignUp from "../../Pages/SignUp/SignUp";
import Products from "../../Pages/ProductCategory/Products";


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


    }
])

export default router;