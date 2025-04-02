import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { GiCrossMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const SideMenu = () => {
  const [menuopen, setmenuopen] = useState(false);

    
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>

      <button
        onClick={() => setmenuopen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-md z-50"
      >
        <MdMenu size={24} />
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-transparent p-6 shadow-lg transform ${
          menuopen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 backdrop-blur-sm`} 
      >
       
        <button
          onClick={() => setmenuopen(false)}
          className="absolute top-4 left-4 text-white text-2xl"
        >
          <GiCrossMark size={24} />
        </button>

        <div className="mt-20">

          <Link
            to="/punjabi"
            className={`block text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            Punjabi
          </Link>

          <Link
            to="/tamil"
            className={`block text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            Tamil
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

