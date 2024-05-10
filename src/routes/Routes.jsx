import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import Home from "../components/Home/Home";
import Register from "../pages/Register";
import CreateAssignments from "../pages/CreateAssignments";
import Assignments from "../pages/Assignments";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>,
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/createAssignments',
                element:<CreateAssignments></CreateAssignments>
            },
            {
                path:'/assignments',
                element:<Assignments></Assignments>
            }
        ]
    },
    
])

export default router;