import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removesong } from "../Slice/Playlistdata";

const PlayList = () => {
  const dispatch = useDispatch();
  
  const playlistSongs = useSelector((state) => state.playlist?.songs);

  if (!playlistSongs.length) {
    return <h2 className="text-center text-white">No Songs in Playlist</h2>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl text-center mb-6">Your Playlist</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlistSongs.map((song) => {
          const songaudio = song.downloadUrl.find((file) => file.quality === "320kbps")
            || song.downloadUrl.find((file) => file.quality === "160kbps")
            || song.downloadUrl.find((file) => file.quality === "96kbps");
          const songimg = song.image.find((img) => img.quality === "500x500").url;
          const artistname = song.artists.primary.map((artist) => artist.name).join(', ');
          
          return (
            <div key={song.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
              
              <img src={songimg} alt={song.name} className="w-full h-48 object-cover rounded-md mb-3" />
              
            
              <h3 className="text-lg font-semibold">{song.name}</h3>
              <p className="text-sm text-gray-400">Artists: {artistname}</p>
              <p className="text-sm text-gray-400">Year: {song.year}</p>
              
              
              <audio controls className="w-full mt-2">
                <source src={songaudio.url || songaudio.link} type="audio/mp4" />
              </audio>
              
              
              <button
                className="mt-4 w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                onClick={() => dispatch(removesong(song))}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayList;
