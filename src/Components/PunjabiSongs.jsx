// import React from 'react'
// import { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import UseGrid from '../Context/UseGrid';
// import { useDispatch, useSelector } from 'react-redux';
// import { addsong, removesong } from '../Slice/Playlistdata';
// import SideMenu from './SideMenu';




// const PunjabiSongs = () => {
//     const [search, setsearch] = useState([])
//     const [page, setpage] = useState(false)
//     const [query, setquery] = useState('')
//     const [menuopen, setmenuopen] = useState(false)

//     const {rowcol, handleGrid} = UseGrid();
//     const darkMode = useSelector((state) => state.theme.darkMode);

//     const audioref =  useRef({});

//    useEffect(() => {
//     fetchapi();
    
//    },[])
    

//     const fetchapi = (pagenumber = 1) => {
//         setTimeout(async() => {
//             try {
//                 const response = await axios.get('https://saavn.dev/api/search/songs',{
//                     params:{query : query ||  'Punjabi', limit: 12, page: pagenumber}
//                 });

//                 const songs = response.data.data.results;

                
//                 setsearch((prev) => pagenumber === 1 ? songs:[...prev, ...songs])
//                 console.log(songs)
                
//             } catch (error) {
//                 console.error(error, "data missimg")
//             }
//         }, 1000);
//     }

//     const loadmore = () => {
//       const nextpage = page + 1;
//       setpage(nextpage);
//       fetchapi(nextpage)
//     }


//   return (
//     <div>
//       <div>
//         <div>
//         <input   
//         type="text"  
//         value={query}  
//         onChange={(e) => setquery(e.target.value)}  
//         placeholder="Search for songs..."  
   
//       />  
//         </div>
//       {search.map((song) => {
//        const artistname = song.artists.primary.map((artist) => artist.name).join(',') 
//        const songimage = song.image.find((img) => img.quality === '500x500').url;

//        const songaudio = song.downloadUrl.find((file) => file.quality === '320kbps')
//         || song.downloadurl.find((file) => file.quality === '160kbps')
//         || song.downloadurl.find((file) => file.quality === '96kbps')

//         return (
//             <div key={song.id}>
//              <img
//                 src={songimage}
//                 alt={song.name}
//              />
//                 <p>{artistname}</p>

//                 <div>
//                   <audio controls>
                  
//                     <source src= {songaudio.url || songaudio.link} type = "audio/mp4"/>
//                   </audio>
//                 </div>
//             </div>
//         )
//       })}

//       <div onClick={loadmore}>
//         <button>Load More</button>
//       </div>
        
//       </div>
//     </div>
//   )
// }

// export default PunjabiSongs

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addsong, removesong } from "../Slice/Playlistdata";

const PunjabiSongs = () => {
  const [search, setsearch] = useState([]);
  const [query, setquery] = useState("");
  const [page, setpage] = useState(1);
  const [activeSong, setActiveSong] = useState(null); // Track active song

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const playlist = useSelector((state) => state.playlist.songs);

  useEffect(() => {
    fetchapi();
  }, [query]);

  const fetchapi = async (pagenumber = 1) => {
    try {
      const response = await axios.get("https://saavn.dev/api/search/songs", {
        params: { query: query || "Pujabi", limit: 12, page: pagenumber },
      });

      const songs = response.data.data.results;
      setsearch((prev) => (pagenumber === 1 ? songs : [...prev, ...songs]));
    } catch (error) {
      console.error(error, "data missing");
    }
  };

  const loadmore = () => {
    setpage((prev) => prev + 1);
    fetchapi(page + 1);
  };

  const handleAddToPlaylist = (song) => {
    dispatch(addsong(song));
  };

  const handleRemoveFromPlaylist = (song) => {
    dispatch(removesong(song.id));
  };

  return (
    <div className={`min-h-screen p-6 transition-all ease-in ${darkMode ? "bg-white text-black" : "bg-gray-900 text-gray-100"}`}>
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search for Punjabi songs..."
          className={`p-3 w-full max-w-lg rounded-lg shadow-md transition-all ease-in 
          ${darkMode ? "bg-gray-200 text-black border-gray-400" : "bg-gray-700 text-gray-100 border-gray-500"}`}
        />
      </div>

      {/* Songs Display */}
      <div className="flex flex-wrap justify-center gap-8">
        {search.map((song) => {
          const artistName = song.artists.primary.map((artist) => artist.name).join(", ");
          const songImage = song.image.find((img) => img.quality === "500x500")?.url;
          const songAudio =
            song.downloadUrl?.find((file) => file.quality === "320kbps") ||
            song.downloadUrl?.find((file) => file.quality === "160kbps") ||
            song.downloadUrl?.find((file) => file.quality === "96kbps");

          const isAddedToPlaylist = playlist.some((item) => item.id === song.id);

          return (
            <div 
              key={song.id} 
              className="relative w-full max-w-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setActiveSong(song.id === activeSong ? null : song.id)} // Toggle overlay on tap
            >
              {/* Song Image */}
              <img
                src={songImage}
                alt={song.name}
                className="w-full h-60 object-cover rounded-md transition-transform transform group-hover:scale-105"
              />

              {/* 🛠️ Smooth overlay transition for mobile and desktop */}
              <div className={`absolute inset-0 flex flex-col justify-center items-center bg-black/70 text-white p-4 transition-transform duration-300 ease-in-out
                ${activeSong === song.id ? "translate-y-0" : "translate-y-full"}`}
              >
                <h3 className="text-xl font-bold">{song.name}</h3>
                <p className="text-sm">{artistName}</p>

                {/* Audio Player (Now works on mobile) */}
                <div className="mt-4 w-full">
                  {songAudio?.url ? (
                    <audio controls className="w-full">
                      <source src={songAudio.url} type="audio/mp4" />
                    </audio>
                  ) : (
                    <p className="text-sm text-red-500">Audio not available</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-4">
                  {isAddedToPlaylist ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent overlay from closing when clicking button
                        handleRemoveFromPlaylist(song);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all ease-in"
                    >
                      Remove from Playlist
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPlaylist(song);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all ease-in"
                    >
                      Add to Playlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button
          onClick={loadmore}
          className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all ease-in 
          ${darkMode ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-500"}`}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PunjabiSongs;
