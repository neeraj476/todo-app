import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [inputValue, setInputValue] = useState(""); // State to manage input value

  // Function to handle adding tasks
  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]); // Add new task to the list
      setInputValue(""); // Clear input field
    }
  };

  // Function to handle copying tasks to the clipboard
  const handleCopyTasks = () => {
    if (tasks.length > 0) {
      navigator.clipboard.writeText(tasks.join("\n"));
      alert("Tasks copied to clipboard!");
    } else {
      alert("No tasks to copy!");
    }
  };

  // Function to delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Remove the task by index
    setTasks(updatedTasks);
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/todo-lists" className="hover:bg-blue-500 hover:text-white">
                Todo Lists
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:bg-blue-500 hover:text-white">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/signin" className="hover:bg-blue-500 hover:text-white">
                Signin
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-blue-500 hover:text-white">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-blue-500 hover:text-white">
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
            onChange={(e) => setInputValue(e.target.value)} // Update input value
            className="shadow-md input input-bordered w-1/2 min-w-xs bg-white text-black font-normal"
          />
          <button onClick={handleAddTask} className="md:w-32 bg-[#38c76c] btn border-0 text-white">
            Add
          </button>
          <button onClick={handleCopyTasks} className="md:w-32 bg-[#38c76c] btn border-0 text-white">
            Copy
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Tasks</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-800">{task}</span>
                  <button
                    onClick={() => handleDeleteTask(index)}
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
