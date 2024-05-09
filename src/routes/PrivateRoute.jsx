import PropTypes from 'prop-types';
import { useContext } from "react";
import {Navigate,useLocation} from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation();
    console.log(location)

    if(loading){
        return <div className="w-16 h-16 lg:mx-[900px] lg:my-[300px] border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        }

    if(!user){
        return <Navigate state={location?.pathname || '/'} to='/login'></Navigate>;
    }
    return (
        <div>
            {children}
        </div>
    )
};
PrivateRoute.propTypes={
    children:PropTypes.object
}

export default PrivateRoute;