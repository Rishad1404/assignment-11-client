import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const SubmittedAssignment = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/submitAssignment/${user?.email}`,{withCredentials:true})
            setAssignments(data)
        }
        getData()
    }, [user])
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
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map(assignment => (
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
