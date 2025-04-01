import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidPlaylist } from "react-icons/bi";
import { BsSun, BsMoon } from "react-icons/bs";
import { toggleTheme } from "../Slice/Theme";
import { setSongs } from "../Slice/Playlistdata";

const NavBar = () => {
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userinfo"));
  const cartdata = useSelector((state) => state.playlist.songs);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const clickplaylist = () => {
    if (user) {
      navigate("/playlist");
    } else {
      alert("Not allowed to go to playlist");
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("userinfo");
    dispatch(setSongs([]));
    navigate('/');
  };

  const handleallsong = () => {
    if(!user){

      console.log("button clicked")
      alert('You have to SignUp First !!')
      navigate('/signup')
    }
    else{
      alert('You are already here')
      navigate('/api')
    }
  }

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold tracking-widest hover:text-gray-400 transition-all">
            VibeTrack
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to={"/playlist"} className="flex items-center gap-2">
              <BiSolidPlaylist size={28} />
              {cartdata.length}
            </Link>
            <Link to="/songs" className="hover:text-gray-400 transition-all">
              All Songs
            </Link>
          </div>

          
          <button onClick={() => dispatch(toggleTheme())} className="text-xl mx-4">
            {darkMode ? <BsSun className="text-yellow-500" size={24} /> : <BsMoon className="text-gray-300" size={24} />}
          </button>

          <div className="hidden md:flex">
            {user ? (
              <button className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 py-2 rounded-full font-medium hover:from-black hover:to-gray-800 transition-all" onClick={handlelogout}>
                Logout
              </button>
            ) : (
              <button className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-2 rounded-full font-medium hover:from-black hover:to-gray-800 transition-all" onClick={() => navigate("/signup")}>
                Login
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setmenu(!menu)} className="text-2xl">
              {menu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div className="md:hidden bg-gray-900 text-center py-4">
          <Link onClick={clickplaylist} className="block py-2 hover:text-gray-400">
            Playlist ({cartdata.length})
          </Link>
          <button onClick={ handleallsong} className="block py-2 hover:text-gray-400">
            All Songs
          </button>
          <button onClick={() => dispatch(toggleTheme())} className="text-xl mx-4 block py-2">
            {darkMode ? <BsSun className="text-yellow-500" size={24} /> : <BsMoon className="text-gray-300" size={24} />}
          </button>
          {user ? (
            <button className="block py-2 w-full text-purple-500 hover:text-purple-300" onClick={handlelogout}>
              Logout
            </button>
          ) : (
            <button className="block py-2 w-full text-gray-400 hover:text-white" onClick={() => navigate("/signup")}>
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
