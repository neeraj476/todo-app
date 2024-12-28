import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [inputValue, setInputValue] = useState(""); // State to manage input value
  const apiBaseUrl = "http://localhost:3000/list";

  // Fetch tasks from backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('jwttoken'); // Using jwttoken consistently
      
      if (!token) {
        console.error("No token found in localStorage");
        return; // Exit early if token is not found
      }
  
      try {
        const response = await axios.get(`${apiBaseUrl}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); // Handle the response here
        setTasks(response.data); // Update state with fetched tasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
  
    fetchTasks();
  }, []); // Empty dependency array, fetch tasks on mount

  // Handle adding a new task (list)
  const handleAddTask = async () => {
    console.log("Add task button clicked");
    console.log("Input Value:", inputValue);
  
    if (inputValue.trim() !== "") {
      const newTask = {
        title: inputValue,
        description: "Default description",
        isComplete: false,
      };
  
      try {
        const token = localStorage.getItem("jwttoken"); // Using jwttoken consistently
        if (!token) {
          console.error("No token found in localStorage");
          return;  // Early exit if no token exists
        }
  
        const response = await axios.post(
          `${apiBaseUrl}/create`,
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the correct token format
            },
          }
        );
  
        console.log("Task added:", response.data);
  
        // Assuming the response contains the updated list of tasks
        setTasks((prevTasks) => [...prevTasks, response.data.newList]); // Update tasks using the previous state
  
        setInputValue(""); // Clear the input field after adding task
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  
  // Handle task deletion
  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem("jwttoken"); // Using jwttoken consistently
      if (!token) {
        console.error("No token found in localStorage");
        return; // Early exit if no token exists
      }

      await axios.delete(`${apiBaseUrl}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Ensure token is used in headers
      });
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle copying tasks
  const handleCopyTasks = () => {
    if (tasks.length > 0) {
      navigator.clipboard.writeText(tasks.map((task) => task.title).join("\n")).then(() => {
        alert("Tasks copied to clipboard!");
      }).catch(() => {
        alert("Failed to copy tasks!");
      });
    } else {
      alert("No tasks to copy!");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="navbar bg-base-100 px-6 md:px-20 flex justify-between items-center">
        <Link to="/" className="btn btn-ghost text-2xl">
          ToDo-App
        </Link>
        {/* Right-aligned Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal text-center flex justify-around">
            <li>
              <Link to="/todo-lists" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
                Todo Lists
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="input-field w-full flex gap-5 py-5">
          <input
            type="text"
            placeholder="Type here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="shadow-md input input-bordered w-1/2 min-w-xs bg-white text-black font-normal"
          />
          <button
            onClick={handleAddTask}
            className="md:w-32 bg-[#38c76c] btn border-0 text-white"
            disabled={!inputValue.trim()}
          >
            Add
          </button>
          <button
            onClick={handleCopyTasks}
            className="md:w-32 bg-[#38c76c] btn border-0 text-white"
          >
            Copy
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Tasks</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task._id} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-800">{task.title}</span>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your to-do list will appear here.</p>
          )}
        </div>
      </div>

      {/* Mobile Menu at Bottom */}
      <div className="fixed bottom-2 left-0 w-full text-white p-4 lg:hidden">
        <ul className="menu menu-horizontal text-center flex justify-around">
          <li>
            <Link to="/todo-lists" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
              Todo Lists
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:bg-blue-500 hover:text-white text-black border border-slate-800">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
