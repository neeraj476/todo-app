import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Early validation to ensure fields are not empty
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });

      alert(response.data.message); // Show the response message from backend

      // Store the token in localStorage for future requests
      localStorage.setItem("jwtToken", response.data.token);

      // Navigate to the home page after successful signin
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="box w-full h-screen flex flex-col justify-center items-center px-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-white">Signin</h1>
      <div className="Card w-full max-w-md bg-[#308ccf] p-6 rounded-lg shadow-lg">
        <form
          className="flex flex-col gap-4 items-center px-10"
          onSubmit={handleSubmit}
        >
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
              Signin
            </button>
            <button
              type="button"
              className="btn w-1/2 text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate("/signup")} // Redirect to Signup page
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
