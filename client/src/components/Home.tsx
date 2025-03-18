import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { FiEdit } from "react-icons/fi";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { API_URL } from "../utils/API_URL";

enum taskEnums {
  none = "",
  high = "high",
  medium = "medium",
  low = "low",
}

interface Formdata {
  _id: string;
  taskName: string;
  taskDescription: string;
  priority: taskEnums;
  deadline: string;
  status: string;
}

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<Formdata>({
    mode: "all",

    defaultValues: {
      status: "pending",
      taskName: "",
    },
  });

  const [taskData, setTaskData] = useState<Formdata[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [filteredTask, setFilteredTask] = useState<Formdata[]>([]);

  const [editTask, setEditTask] = useState<Formdata | null>(null);

  const [filterPriority, setFilterpriority] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTask.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentTasks = filteredTask.slice(startIdx, startIdx + itemsPerPage);

  const sendTaskData = async (data: Formdata) => {
    try {
      const res = await axios.post(`${API_URL}/tasks`, data);

      if (res) {
        toast.success(res.data.message);
        await setTaskData((prev) => [...prev, res.data.task]);
        await setFilteredTask((prev) => [...prev, res.data.task]);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTaskData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/tasks`);

      if (res) {
        setTaskData(res.data);
        setFilteredTask(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: Formdata) => {
    console.log(data);
    if (editTask) {
      updateTask(data);
    } else {
      sendTaskData(data);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const res = await axios.delete(`http://localhost:3001/tasks/${taskId}`);

      if (res) {
        toast.success(res.data.message);
        await setTaskData((prev) => prev.filter((task) => task._id !== taskId));
        await setFilteredTask((prev) =>
          prev.filter((task) => task._id !== taskId)
        );
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  const updateTask = async (data: Formdata) => {
    try {
      const res = await axios.put(
        `${API_URL}/tasks/${editTask?._id}`,
        data
      );

      if (res) {
        toast.success("Task Updated Successfully");
        await setTaskData((prev) =>
          prev.map((task) =>
            task._id === editTask?._id ? { ...task, ...data } : task
          )
        );
        await setFilteredTask((prev) =>
          prev.map((task) =>
            task._id === editTask?._id ? { ...task, ...data } : task
          )
        );
        if (editTask) {
          reset({
            _id: "",
            taskName: "",
            taskDescription: "",
            priority: taskEnums.none,
            deadline: "",
            status: "pending",
          });
        }
        setEditTask(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateOne = async (taskId: string, taskStatus: string) => {
    try {
      const res = await axios.patch(
        `${API_URL}/tasks/updateOne/${taskId}`,
        { status: taskStatus }
      );

      if (res) {
        toast.success("Task Completed Successfully");

        setTaskData((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: taskStatus } : task
          )
        );

        setFilteredTask((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: taskStatus } : task
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update task status");
    }
  };

  const handleEdit = (task: Formdata) => {
    setEditTask(task);
    reset(task);
  };

  const handleDatefilter = () => {
    let filteredTasks = taskData;

    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate).getTime();
      const endDate = new Date(dateRange.endDate).getTime();

      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.deadline).getTime();
        return taskDate >= startDate && taskDate <= endDate;
      });
    }

    if (filterPriority !== "") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filterPriority
      );
    }

    setFilteredTask(filteredTasks);
  };

  const handleReset = () => {
    setFilteredTask(taskData);
    setDateRange({ startDate: "", endDate: "" });
    setFilterpriority("");
  };

  const checkToken = () => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Login session expired Please login again!");
      navigate("/");
    }
  };

  useEffect(() => {
    getTaskData();
    checkToken();
  }, []);

  return (
    <>
      <div className="w-full justify-center items-center  mt-6 flex gap-x-7">
        <button
          className="bg-gray-600 py-1 px-4 text-white rounded-sm"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>
        <button
          className="bg-green-600 py-1 px-4 text-white rounded-sm"
          onClick={() => navigate("/user")}
        >
          user
        </button>
      </div>

      {/* App Header */}
      <div className="flex justify-center items-center border-b border-b-[#dcdcdc]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[70%] lg:w-[40%] my-4 p-2 items-center flex flex-col space-y-3"
        >
          <div className="w-full flex justify-between relative">
            <input
              {...register("taskName")}
              defaultValue={editTask?.taskName || ""}
              required
              type="text"
              className="w-[48%] rounded-sm outline-none px-2 text-left py-1.5 bg-[#f9f9f9] text-lg border border-[#dfe3e6] placeholder:text-[#686868]"
              placeholder="Enter your task"
            />

            <input
              {...register("taskDescription")}
              required
              type="text"
              defaultValue={editTask?.taskDescription || ""}
              className="w-[48%] rounded-sm outline-none px-2 text-left py-1.5 bg-[#f9f9f9] text-lg border border-[#dfe3e6] placeholder:text-[#686868]"
              placeholder="Enter task description"
            />
          </div>
          <div className="w-full flex-col md:flex-row flex justify-between gap-x-2">
            <div className="flex gap-x-2.5 ">
              <input
                {...register("deadline")}
                required
                defaultValue={editTask?.deadline || ""}
                className="w-[48%] md:w-auto py-1.5 px-4 bg-[#f9f9f9] border border-[#dfe3e6] outline-none rounded-md"
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
              <select
                {...register("priority")}
                defaultValue={editTask?.priority || ""}
                required
                className="w-[48%] md:w-auto py-1.5 px-4 bg-[#f9f9f9] border border-[#dfe3e6] outline-none rounded-md"
              >
                <option value="">Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-1.5 justify-center md:m-0 mt-4 rounded-md cursor-pointer px-3.5 bg-violet-700 text-[16px] font-medium text-white flex items-center"
            >
              <GoPlus /> {editTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>

      {/* Filteration */}

      <div className="w-full items-center flex md:flex-row flex-col justify-center p-2 gap-x-2">
        <h1 className="justify-self-start">Filter by : </h1>
        <div className="py-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterpriority(e.target.value)}
            className="py-1.5 px-4 bg-[#f9f9f9] border border-[#dfe3e6] outline-none rounded-md"
          >
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex space-x-2.5 items-center">
          <input
            name="startDate"
            className="py-1.5 px-4 bg-[#f9f9f9] border border-[#dfe3e6] outline-none rounded-md"
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
          />
          <h2>to</h2>
          <input
            name="endDate"
            className="py-1.5 px-4 bg-[#f9f9f9] border border-[#dfe3e6] outline-none rounded-md"
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
          />
        </div>
        <div className="flex my-4 md:m-0  gap-x-4 ">
          <button
            onClick={handleDatefilter}
            className="py-1 px-4 cursor-pointer rounded-sm bg-blue-500 text-white"
          >
            Filter
          </button>
          <button
            onClick={handleReset}
            className="py-1 px-4 cursor-pointer rounded-sm bg-gray-500 text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* All Tasks */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-0 md:my-5 md:mx-20 gap-3">
        {loading ? (
          <Spinner />
        ) : currentTasks.length === 0 ? (
          <h1 className="col-span-3 text-center">No Data Found</h1>
        ) : (
          currentTasks.map((task, index) => (
            <div
              key={index}
              className="box h-auto p-3 border mx-4 rounded-md border-[#dcdcdc]"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3 justify-between w-[90%]">
                  <h1 className="text-2xl font-semibold">
                    {task.taskName}
                    <span
                      className={`uppercase text-xs rounded-sm text-white font-medium ml-2 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      } px-2 py-0.5`}
                    >
                      {task.priority}
                    </span>
                  </h1>
                  <h3 className="text-sm break-after-all max-h-8 overflow-y-auto">
                    {task.taskDescription}
                  </h3>
                  <h5 className="text-xs font-medium">
                    Due : {task.deadline.split("T")[0]}
                  </h5>
                </div>
                <div className="flex flex-col items-center space-y-2.5">
                  <button
                    disabled={task.status === "completed"}
                    type="button"
                    onClick={() => handleDelete(task._id)}
                  >
                    <MdDeleteForever
                      className={`text-2xl hover:text-[#9f9d9d] ${
                        task.status === "completed"
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </button>
                  <button
                    disabled={task.status === "completed"}
                    type="button"
                    onClick={() => handleEdit(task)}
                  >
                    <FiEdit
                      className={`text-lg text-blue-600 ${
                        task.status === "completed"
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } hover:text-blue-700`}
                    />
                  </button>
                  <button
                    onClick={() => handleUpdateOne(task._id, "completed")}
                    disabled={task.status === "completed"}
                    className={`${
                      task.status === "completed"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } `}
                  >
                    {task.status === "completed" ? (
                      <CiBookmarkCheck className="text-green-600 text-xl" />
                    ) : (
                      <FaArrowAltCircleUp className="text-green-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2.5 lg:gap-x-2.5 border-t border-gray-500 mx-4 lg:mx-20 mt-4">
        <div className="flex items-center gap-x-2.5">
          <select
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            value={itemsPerPage}
            className="outline-none py-1 px-3 m-2 border"
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <h1>
            Number of Pages - {currentPage} of {totalPages}
          </h1>
        </div>
        <div className="flex gap-x-3.5">
          {/* Previous Button */}
          <button
            className="py-1 px-2 text-lg rounded-full bg-gray-500 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <MdNavigateBefore />
          </button>
          <button
            className="py-1 px-2 bg-gray-500 text-white text-lg rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
