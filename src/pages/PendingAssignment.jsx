import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const PendingAssignment = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/submitAssignment/${user?.email}`)
            setAssignments(data)
        }
        getData()
    }, [user])
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto my-20 min-h-[calc(100vh-510px)] rounded-lg bg-base-200">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="text-lg text-blue-400 ">
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Assignment Marks</th>
                                <th>Give Mark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment,idx )=> (
                                <tr key={assignment._id}>
                                    <td>{user.displayName}</td>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.mark}</td>
                                    <td><button onClick={() => document.getElementById(`my_modal_${idx}`).showModal()} className="btn bg-blue-300 text-blue-700 font-ubuntu font-bold">Give Mark</button>
                                        <dialog id={`my_modal_${idx}`} className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">
                                                <section className="max-w-4xl p-6 mx-auto rounded-md shadow-m">
                                                    <h2 className="text-xl font-bold capitalize text-center">Give Mark</h2>

                                                    <form>
                                                        <div className="grid grid-cols-1 gap-6 mt-4">
                                                        <div>
                                                                <label htmlFor="">PDF Link</label>
                                                                <h1 className="w-full text-blue-400 px-5 py-2 border text-lg  border-blue-400 rounded-lg">{assignment.pdf}</h1>
                                                                
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">Note</label>
                                                                <h1 className="w-full text-blue-400 px-5 py-2 border text-lg  border-blue-400 rounded-lg">{assignment.note}</h1>
                                                            </div>
                                                            <div>
                                                                <label className="">Give a Mark</label>

                                                                <input placeholder="" className="block w-full px-4 py-2 bg-white border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="givenMark" id=""></input>
                                                            </div>
                                                            <div>
                                                                <label className="">Give Feedback</label>
                                                                <input placeholder="" className="block w-full px-4 py-2 bg-white border border-blue-400 rounded-lg  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="feedback" id=""></input>
                                                            </div>
                                                            <button type="submit" className="btn bg-blue-400 w-full text-white px-10 font-bold font-ubuntu">Give</button>
                                                        </div>
                                                    </form>
                                                </section>
                                                <div className="modal-action">
                                                    <form method="dialog">

                                                        {/* if there is a button in form, it will close the modal */}

                                                        <button className="btn bg-red-500 text-white font-ubuntu">Close</button>

                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PendingAssignment;