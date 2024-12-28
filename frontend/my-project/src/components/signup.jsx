import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
      });
      alert(response.data.message);
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    alert(`Signup successful! Welcome, ${name}`);
    navigate("/signin"); // Redirect to Signin page after successful signup
  };

  return (
    <div className="box w-full h-screen flex flex-col justify-center items-center px-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-white">Signup</h1>
      <div className="Card w-full max-w-md bg-[#308ccf] p-6 rounded-lg shadow-lg">
        <form className="flex flex-col gap-4 items-center px-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full h-10 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full h-10 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full h-10 text-white"
          />
          <hr className="w-full border-t rounded-xl border-gray-300 my-4" />
          <div className="w-full flex gap-5">
            <button
              type="submit"
              className="btn w-1/2 text-white bg-green-500 hover:bg-green-600"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn w-1/2 text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate("/signin")} // Redirect to Signin page
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
