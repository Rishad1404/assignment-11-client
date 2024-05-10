import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const CreateAssignments = () => {
    const{user}=useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());

    const handleAddAssignment=e=>{
        e.preventDefault();
        const email=user.email;
        const title=e.target.title.value;
        const description=e.target.description.value;
        const thumbnail=e.target.thumbnail.value;
        const difficulty=e.target.difficulty.value;
        const mark=e.target.mark.value;
        const due=e.target.due.value;

        const info={email,title,description,mark,thumbnail,difficulty,due}
        console.log(info)

        fetch(`${import.meta.env.VITE_API_URL}/assignments`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(info)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.insertedId){
                toast.success('Assignment Created')
                e.target.reset();
            }
        })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto my-10">
                <section className="dark:bg-base-200">
                    <div className="flex justify-center">
                        <div className="hidden bg-cover lg:block lg:w-2/5"  
                        style={{
                                backgroundImage: `url('https://i.imgur.com/AlS0Z6K.jpg')`,
                            }}>
                        </div>

                        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                            <div className="w-full">
                                <h1 className="text-5xl font-bold text-center tracking-wider capitalize ">
                                    Add Assignment
                                </h1>                         

                                <form onSubmit={handleAddAssignment} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-sm  ">Title</label>
                                        <input type="text" name="title" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white  -gray-200 rounded-lg dark:placeholder-gray-600   dark:-gray-700 focus:-blue-400 dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm  ">Description</label>
                                        <input type="text" name="description" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white  -gray-200 rounded-lg dark:placeholder-gray-600   dark:-gray-700 focus:-blue-400 dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm  ">Marks</label>
                                        <input type="number" name="mark" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white  -gray-200 rounded-lg dark:placeholder-gray-600   dark:-gray-700 focus:-blue-400 dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm  ">Thumbnail Image URL</label>
                                        <input type="text" name="thumbnail" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white  -gray-200 rounded-lg dark:placeholder-gray-600   dark:-gray-700 focus:-blue-400 dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm">Difficulty Level</label>
                                        <select name="difficulty" id="" className="p-3 rounded-lg w-full font-ubuntu dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                                            <option value="">Select an Option</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm  ">Due Date</label>
                                        <DatePicker name="due" className="p-3 lg:w-[325px] rounded-lg font-ubuntu dark:focus:-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center w-full justify-between px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        <span>Create Assignment</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CreateAssignments;