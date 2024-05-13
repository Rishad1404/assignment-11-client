import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PendingAssignment = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/submitAssignment/${user?.email}`)
            setAssignments(data)
        }
        getData()
    }, [user])


    const handleSubmitMark = (e, id) => {
        e.preventDefault();
        const form = e.target;
        const status = 'Completed';
        const givenMark = form.givenMark.value;
        const feedback = form.feedback.value;

        const updatedInfo = { status, givenMark, feedback };

        fetch(`${import.meta.env.VITE_API_URL}/confirmed/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount > 0) {
                    toast.success("Mark Given Successfully")
                    navigate('/submitted')
                } else if (data?.modifiedCount === 0) {
                    toast.error('Unsuccessful Operation')
                }
            })
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto my-20 min-h-[calc(100vh-510px)]">
                <h2 className="text-center text-4xl font-bold mb-10">My Submitted Assignment</h2>
                <div className="rounded-lg bg-base-200">
                    <div className="overflow-x-auto">
                        <table className="table w-full rounded-lg">
                            <thead className="text-lg text-blue-400 ">
                                <tr>
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Assignment Marks</th>
                                    <th>Status</th>
                                    <th>Marking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, idx) => (
                                    <tr key={assignment._id}>                                      
                                        <td className="font-bold">{assignment.title}</td>
                                        <td className="font-bold">{user.displayName}</td>
                                        <td className="font-bold">{assignment.mark}</td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <p
                                                    className={`px-3 py-1 rounded-full font-bold  ${assignment.status === 'Pending' && 'text-yellow-600 bg-yellow-100'}
                                                                                ${assignment.status === 'Completed' && 'text-green-500 bg-green-100'} 
                                            `}
                                                >
                                                    {assignment.status}
                                                </p>
                                            </div>

                                        </td>
                                        <td><button onClick={() => document.getElementById(`my_modal_${idx}`).showModal()} className="px-4 py-1 rounded-xl bg-blue-500 text-blue-100 font-ubuntu font-bold">Give Mark</button>
                                            <dialog id={`my_modal_${idx}`} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-m">
                                                        <h2 className="text-xl font-bold capitalize text-center">Give Mark</h2>

                                                        <form onSubmit={(e) => handleSubmitMark(e, assignment._id)}>
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
        </div>
    );
};

export default PendingAssignment;