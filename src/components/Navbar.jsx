import { Link, NavLink, Navigate } from 'react-router-dom'
import logo from '/logo.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { CgProfile } from "react-icons/cg";
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState('retro')

    const handleTheme = e => {
        if (e.target.checked) {
            setTheme('retro')
        }
        else {
            setTheme('dim')
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const handleLogout = () => {
        logOut()
            .then(() => {
                // toast.success('Logged Out');
                Navigate(location.state = '/login');
            })
            .catch(() => {
                toast.success("Logged Out");
            });
    }

    const navLinks = (
        <>
            <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-lg border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-lg border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/assignments'>Assignments</NavLink></li>
            {
                !user &&
                <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-lg border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/login'>Login</NavLink></li>              
            }
            {
                !user && <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-lg border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/register'>Register</NavLink></li>
            }
            {
                user ? <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-log border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/createAssignments'>Create Assignments</NavLink></li> : null
            }
            {
                user ? <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-log border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/pending'>Pending Assignments</NavLink></li> : null
            }
            {
                user ? <li><NavLink className={({ isActive }) => isActive ? 'text-blue-400 border rounded-log border-blue-400 font-ubuntu text-lg font-bold' : 'text-lg font-ubuntu font-bold'} to='/submitted'>Submitted Assignments</NavLink></li> : null
            }
        </>
    )
    return (
        <div className=''>
            <div className="navbar bg-base-100 container mx-auto">
                <div className="flex-1">
                    <Link><img className='w-20 lg:w-44' src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex-none ml-5 ">
                    
                    <div className='mr-5'>
                        <label className="cursor-pointer grid place-items-center">
                            <input onChange={handleTheme} type="checkbox" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>
                    {
                        user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            {user && user.photoURL ? (
                                    <img type="button" className="w-full h-full object-cover" src={user?.photoURL} referrerPolicy='no-referrer' alt="Profile" />
                                ) : (
                                    <CgProfile className="lg:w-full lg:h-full object-cover" />
                                )}
                                {user && user.displayName && (
                                    <Tooltip anchorSelect="#my-anchor-element-id" place="bottom" content={user?.displayName} />
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                            {
                                <li><button onClick={handleLogout} className="text-xl font-bold">Logout</button></li> 
                            }

                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar