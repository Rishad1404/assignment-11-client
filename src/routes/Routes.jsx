import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import Assignment from "../pages/Assignment";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Assignment></Assignment>
            },
            {
                path:'/login',
                element:<Login></Login>,
            }
        ]
    },
    
])

export default router;