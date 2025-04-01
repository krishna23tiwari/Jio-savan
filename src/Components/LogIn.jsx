import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = JSON.parse(localStorage.getItem("userinfo"));

    if (!signupData) {
      alert("Please sign up first.");
      return;
    }

    if (signupData.email !== email && signupData.password !== password) {
      alert("Please enter a valid Email and Password.");
    } else if (signupData.email !== email) {
      alert("Please enter a valid Email.");
    } else if (signupData.password !== password) {
      alert("Please enter a valid Password.");
    } else {
      alert("Login successful!");
      navigate("/api");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative pt-20 sm:pt-24 p-4">
     
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515175192010-cf3250992719?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Music Background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
      
        <h2
          className="text-3xl sm:text-4xl text-purple-300 mb-6 sm:mb-8 drop-shadow-lg"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          "Feel the Beat, Join the Flow"
        </h2>

       
        <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-black bg-opacity-30 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-300">
            Login
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Unlock your world of music by logging in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

           
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-300">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-purple-400 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
