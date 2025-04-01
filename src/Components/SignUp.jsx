import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const data = { name, email, password };
    localStorage.setItem("userinfo", JSON.stringify(data));

    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
   
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Music Vibe"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center text-white p-10">
          <h2 className="text-4xl font-bold leading-snug text-center italic">
            "Feel the Rhythm, Join the Vibe. <br /> Let's Play Music Together!"
          </h2>
        </div>
      </div>

     
      <div className="w-full md:w-1/2 flex justify-center items-center bg-black">
        <form className="bg-[#0d0d0d] bg-opacity-80 backdrop-blur-md border border-gray-700 shadow-2xl p-6 md:p-10 rounded-xl w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-300">
            Sign Up
          </h2>

          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-2 bg-[#1b1b1b] text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

         
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-2 bg-[#1b1b1b] text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 bg-[#1b1b1b] text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
