import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import Home from "../components/Home/Home";
import Register from "../pages/Register";
import CreateAssignments from "../pages/CreateAssignments";
import Assignments from "../pages/Assignments";
import UpdateAssignments from "../pages/UpdateAssignments";
import AssignmentDetails from "../pages/AssignmentDetails";
import PendingAssignment from "../pages/PendingAssignment";
import Error from "../components/ErrorPage/Error";
import SubmittedAssignment from "../pages/SubmittedAssignment";
import PrivateRoute from "./PrivateRoute";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<Error></Error>,
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
            },
            {
                path:'/updateAssignment/:id',
                element:<PrivateRoute><UpdateAssignments></UpdateAssignments></PrivateRoute>
            },
            {
                path:'/submitted',
                element:<PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>
            },
            {
                path: '/assignments/:id',
                element:<AssignmentDetails></AssignmentDetails>,
                loader:()=>fetch(`${import.meta.env.VITE_API_URL}/assignments`)
            },
            {
                path:'/pending',
                element:<PrivateRoute><PendingAssignment></PendingAssignment></PrivateRoute>
            }
        ]
    },
    
])

export default router;