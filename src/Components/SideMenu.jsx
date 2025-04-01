// import React, { useState } from "react";
// import { MdMenu } from "react-icons/md";
// import { GiCrossMark } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const SideMenu = () => {
//   const [menuopen, setmenuopen] = useState(false);

//   const darkMode = useSelector((state) => state.theme.darkMode);

//   return (
//     <>
//       {/* 📌 Floating Menu Button (Fixed in Bottom-Right Corner) */}
//       <button
//         onClick={() => setmenuopen(true)}
//         className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-md z-50"
//       >
//         <MdMenu size={24} />
//       </button>

//       {/* 📜 Sidebar Panel with Transparent Background */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-transparent text-white p-6 shadow-lg transform ${
//           menuopen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300 ease-in-out z-50 backdrop-blur-sm`} 
//       >
//         {/* ❌ Close Button */}
//         <button
//           onClick={() => setmenuopen(false)}
//           className="absolute top-4 left-4 text-white text-2xl"
//         >
//           <GiCrossMark size={24} />
//         </button>

//         {/* 📚 Links in Column */}
//         <div className="mt-20"> {/* Space below the close icon */}
//           <Link
//             to="/english"
//             className="block text-2xl font-bold mt-4"  // Stack them vertically with margin
//           >
//             English
//           </Link>

//           <Link
//             to="/punjabi"
//             className="block text-2xl font-bold mt-4"  // Add margin for spacing
//           >
//             Punjabi
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideMenu;

import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { GiCrossMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const SideMenu = () => {
  const [menuopen, setmenuopen] = useState(false);

  // Access darkMode state from Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      {/* 📌 Floating Menu Button (Fixed in Bottom-Right Corner) */}
      <button
        onClick={() => setmenuopen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-md z-50"
      >
        <MdMenu size={24} />
      </button>

      {/* 📜 Sidebar Panel with Transparent Background */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-transparent p-6 shadow-lg transform ${
          menuopen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 backdrop-blur-sm`} 
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => setmenuopen(false)}
          className="absolute top-4 left-4 text-white text-2xl"
        >
          <GiCrossMark size={24} />
        </button>

        {/* 📚 Links in Column with Conditional Text Color */}
        <div className="mt-20">
          {/* Conditional Text Color Based on darkMode */}
          <Link
            to="/english"
            className={`block text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            English
          </Link>

          <Link
            to="/punjabi"
            className={`block text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            Punjabi
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

