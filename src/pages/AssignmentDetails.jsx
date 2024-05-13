import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const AssignmentDetails = () => {
    const {user}=useContext(AuthContext)
    const { id } = useParams()
    const navigate=useNavigate()
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/singleAssignment/${id}`)
            .then(res => res.json())
            .then(data => {
                setAssignments(data)
                console.log(data)
            })
    }, [id])

    const handleSubmitAssignment=async e=>{
        e.preventDefault();
        const form=e.target;
        const assignmentId=assignments._id;
        const note=form.note.value;
        const pdf=form.pdf.value;
        const email=user?.email;
        const title=assignments.title;
        const mark=assignments.mark;
        const status='Pending';

        const submitData={assignmentId,email,title,note,pdf,mark,status}
        try{
            toast.success("Submitted Successfully")
            const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/submit`,submitData)
            console.log(data)
            navigate('/submitted')
            
        }
        catch(err){
            console.log(err)
        }

    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container lg:mx-auto my-10">
                <div className="lg:flex gap-10 g:card-side bg-base-100 shadow-xl">
                    <figure><img className="h-[200px] lg:h-[600px] w-full lg:w-[1000px]" src={assignments.thumbnail} alt="Album" /></figure>
                    <div className="mb-2 space-y-5 space-x-2 lg:space-y-14">
                        <h2 className="text-3xl mx-2 lg:text-5xl font-bold my-5">{assignments.title}</h2>

                        <p className="pr-1"><span className="text-3xl font-bold underline">Description:</span> <br />{assignments.description}</p>
                        <div className="lg:my-20 lg:space-y-5">
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Mark      :<span className="text-blue-400 lg:text-5xl">{assignments.mark}</span></h2>
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Difficulty:<span className="text-blue-400 lg:text-5xl">{assignments.difficulty}</span></h2>
                            <h2 className="font-ubuntu font-bold lg:text-4xl">Due Date  :<span className="text-blue-400 lg:text-5xl">{assignments.due}</span></h2>
                        </div>

                        <div className="lg:flex gap-5">
                            <Link><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-blue-400 text-white">Take Assignment</button></Link>
                            <Link to='/assignments'><button className="btn bg-blue-400 text-white">Go Back</button></Link>
                        </div>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <section className="max-w-4xl p-6 mx-auto rounded-md shadow-m">
                                    <h2 className="text-xl font-bold capitalize text-center">Submit the Assignment</h2>

                                    <form onSubmit={handleSubmitAssignment}>
                                        <div className="grid grid-cols-1 gap-6 mt-4">
                                            <div>
                                                <label className=" ">Upload the file</label>
                                                <input id="username" name="pdf" type="text" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,.jpg,.png,.jpeg" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                                            </div>

                                            <div>
                                                <label className="">Note</label>
                                            
                                                <textarea placeholder="Write a Quick note" className="block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="note" id=""></textarea>
                                            </div>
                                            <button type="submit" className="btn bg-blue-400 w-full text-white px-10 font-bold font-ubuntu">Submit</button>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;