import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const AssignmentDetails = () => {
    const { id } = useParams()
    console.log(id)
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/singleAssignment/${id}`)
            .then(res => res.json())
            .then(data => {
                setAssignments(data)
                console.log(data)
            })
    }, [id])
    return (
        <div>
            <Navbar></Navbar>
            <div className="container lg:mx-auto my-10">
                <div className="lg:flex gap-10 g:card-side bg-base-100 shadow-xl">
                    <figure><img className="h-[200px] lg:h-[600px] w-full lg:w-[1100px]" src={assignments.thumbnail} alt="Album" /></figure>
                    <div className="mb-2">
                        <h2 className="text-2xl lg:text-5xl font-bold my-5">{assignments.title}</h2>
                        <p className="pr-1 my-5">{assignments.description}</p>
                        <div className="lg:my-20">
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Mark:<span className="text-green-600 lg:text-5xl">{assignments.mark}</span></h2>
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Difficulty:<span className="text-green-600 lg:text-5xl">{assignments.difficulty}</span></h2>
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Due Date:<span className="text-green-600 lg:text-5xl">{assignments.due}</span></h2>
                        </div>

                        <div className="flex gap-5">
                            <Link><button className="btn bg-blue-400 text-white">Take Assignment</button></Link>
                            <Link to='/assignments'><button className="btn bg-blue-400 text-white">Go Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;