import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const SubmittedAssignment = () => {
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
            <Navbar />
            <div className="container mx-auto my-20 min-h-[calc(100vh-510px)] rounded-lg bg-base-200">
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
                                    <td>{assignment.title}</td>
                                    <td>
                                        <span className="px-2 py-1 font-normal rounded-full text-emerald-500 bg-emerald-100/60">{assignment.status}</span>
                                    </td>
                                    <td>{assignment.mark}</td>
                                    <td>Not given yet</td>
                                    <td>Not given yet</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubmittedAssignment;
