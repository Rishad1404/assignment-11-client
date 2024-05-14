import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";

const SubmittedAssignment = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                console.log(`Fetching data for ${user?.email}`);
                const { data } = await axios(`${import.meta.env.VITE_API_URL}/submitAssignment/${user?.email}`, { withCredentials: true });
                console.log('Data fetched:', data);
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (user?.email) {
            getData();
        }
    }, [user]);
    return (
        <div>
            <Navbar />

            <div className="container mx-auto my-20 min-h-[calc(100vh-510px)] ">
                <h2 className="text-center text-4xl font-bold mb-10">My Submitted Assignment</h2>
                <div className="rounded-lg bg-base-200">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="text-lg text-blue-400 ">
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Assignment Marks</th>
                                    <th>Obtained Marks</th>
                                    <th>View Assignment</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, idx) => (
                                    <tr key={assignment._id}>
                                        <td className="font-bold">{assignment.title}</td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <p
                                                    className={`px-3 py-1 rounded-full font-bold ${assignment.status === 'Pending' && 'text-yellow-600 bg-yellow-100'}
                                                                                ${assignment.status === 'Completed' && 'text-green-600 bg-green-100'} 
                                            `}
                                                >
                                                    {assignment.status}
                                                </p>
                                            </div>

                                        </td>
                                        <td className="font-bold">{assignment.mark}</td>
                                        <td className="font-bold">{assignment.givenMark ? assignment.givenMark : "Not Given Yet"} </td>
                                        <td className="font-bold"><MdOutlineRemoveRedEye onClick={() => document.getElementById(`my_modal_${idx}`).showModal()} className="text-lg" />
                                            <dialog id={`my_modal_${idx}`} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-m">
                                                        {/* <iframe src={assignment.pdf}></iframe> */}
                                                        <img src={assignment.pdf} alt="" />
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
                                        <td className="font-bold">{assignment.feedback ? assignment.feedback : "Not Given Yet"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmittedAssignment;
