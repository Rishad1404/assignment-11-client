import { CiFilter } from "react-icons/ci";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Assignments = () => {
    const { user } = useContext(AuthContext) || {}
    const [items, setItems] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/assignments`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setItems(data)
            })
    }, [user])

    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
    };

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed && user) {

                fetch(`${import.meta.env.VITE_API_URL}/myAssignments/${_id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        }
                    })
            }
        });
    }

    const filteredItems = filterCriteria
        ? items.filter(item => item.difficulty == filterCriteria)
        : items;

        const itemsToRender = Array.isArray(filteredItems) ? filteredItems : [];

    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-base-200 py-5 my-5 text-center">
                <h1 className="text-2xl lg:text-6xl font-serif text-center my-3 lg:my-10">All Assignments</h1>
                <select
                    name=""
                    id=""
                    onChange={handleFilterChange}
                    value={filterCriteria}
                    className="bg-blue-400 text-white px-5 py-3 rounded-lg text-xl"
                >
                    <CiFilter />
                    <option value="">Filter by difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="container mx-auto my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {itemsToRender.map(item => (
                        <div key={item._id} className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                            <img src={item.thumbnail} alt="" className="object-cover object-center w-full rounded-t-md lg:h-72 dark:bg-gray-500" />
                            <div className="flex flex-col justify-between p-6 space-y-8">
                                <div className="space-y-2 text-center">
                                    <h2 className="text-3xl font-bold tracking-wide">{item.title}</h2>
                                    <p className="text-md">{item.description}</p>
                                </div>
                                <div className="flex justify-around">
                                    <h2 className="text-lg font-bold">Difficulty: {item.difficulty}</h2>
                                    <h2 className="font-bold text-lg">Mark: {item.mark}</h2>
                                </div>
                                <div className="lg:flex items-center space-y-1 gap-5 justify-center">
                                    <Link to={`/updateAssignment/${item._id}`}>
                                        <button type="button" className=" p-3 font-semibold tracking-wide rounded-md dark:bg-blue-400 dark:text-gray-50 flex items-center gap-2 justify-center">
                                            <GrUpdate /> Update
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} type="button" className=" p-3 font-semibold tracking-wide rounded-md dark:bg-blue-400 dark:text-gray-50 flex items-center gap-2 justify-center"><MdDeleteOutline /> Delete</button>
                                    <Link to={`/assignments/${item._id}`}><button type="button" className=" p-3 font-semibold tracking-wide rounded-md dark:bg-blue-400 dark:text-gray-50 flex items-center gap-2 justify-center">View Assignment</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Assignments;
