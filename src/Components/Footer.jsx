import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6">
     
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
     
        <h2 className="text-xl font-semibold">🎶 Music Player</h2>

        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-0">
          <a href="#" className="py-2 hover:text-gray-400">Home</a>
          <a href="#" className="py-2 hover:text-gray-400">Playlist</a>
          <a href="#" className="py-2 hover:text-gray-400">About</a>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          © 2025 Music Player. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
