import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import UseGrid from '../Context/UseGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addsong, removesong } from '../Slice/Playlistdata';
import SideMenu from './SideMenu';



const ApiData = () => {
  const [search, setsearch] = useState([]);
  const [load, setload] = useState(false);
  const [page, setpage] = useState(1);
  const [query, setquery] = useState('')
  const [menuopen, setmenuopen] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null);

  const {rowcol, handleGrid} = UseGrid();

  const darkMode = useSelector((state) => state.theme.darkMode);

  
  const audioRefs = useRef({});

  const handlePlay = (songId) => {
    if (currentAudio && currentAudio !== audioRefs.current[songId]) {
      currentAudio.pause();
    }
    setCurrentAudio(audioRefs.current[songId]);
  };

  

  const username = JSON.parse(localStorage.getItem('userinfo'))

  const now = new Date().getHours();
  let greeting = "";

    if (now < 12) {
    greeting = "Good Morning";
  } else if (now < 17) {
    greeting = "Good Afternoon";
  } else if(now < 22) {
    greeting = "Good Evening";
  }else{
    greeting = "Good Night";
  }

  useEffect(() => {
    fetchapi();
    // console.log(query)
  },[query])

  const fetchapi = (pagenumber = 1) => {
   
    setload(true)
    setTimeout(async() => {
        try {
          const response = await axios.get('https://saavn.dev/api/search/songs', {
            params:{query: query || 'Bollywood', limit: 12, page: pagenumber}
          });
          
          const songs = response.data.data.results;
          setsearch((prev) => pagenumber === 1 ? songs:[...prev, ...songs] )
          // console.log(songs)
        } catch (error) {
          console.error(error,"not able to fetch data")
        }finally{
          setload(false)
        }
    }, 2000);
  }


  const loadmore = () => {
    const nextpage = page + 1;
    setpage(nextpage);
    fetchapi(nextpage)
  }



  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.playlist.songs); 


  const addplaylist = (song) => {
    const songExists = cartdata.find((item) => item.id === song.id);
    if (songExists) {
      alert("Song already in playlist!");
      return;
    }
    dispatch(addsong(song));  
  };
  
  


  const removeplaylist = (song) => {
    const songExists = cartdata.find((item) => item.id === song.id);
    if (!songExists) {
      alert("Song not in playlist!");
      return;
    }
    dispatch(removesong({ id: song.id })); 
  };
  
  
  return (
 

    <div className={`p-4 min-h-screen flex flex-col items-center transition-all duration-500 ease-in-out ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-white text-gray-900'}`}>  
       
       <SideMenu menuOpen={menuopen} setMenuOpen={setmenuopen} />
    <div className="flex flex-wrap justify-between items-center mb-4 gap-4 w-full max-w-4xl">  
      <label className="flex items-center cursor-pointer">  
        <span className="mr-2">{rowcol ? 'Row' : 'Column'}</span>  
        <input   
          type="checkbox"   
          checked={rowcol}   
          onChange={handleGrid}   
          className="hidden"  
        />  
        
        <div className="w-10 h-5 bg-gray-600 rounded-full relative transition-all duration-500 ease-in-out">  
          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-500 ease-in-out ${rowcol ? 'translate-x-5' : 'translate-x-0'}`}></div>  
        </div>  
      </label>  

      <h2 className="text-3xl md:text-4xl flex justify-center font-bold">Music Player</h2>  
    </div>  

    
  

    {load && <h2 className="text-xl md:text-2xl flex justify-center font-extralight">Hello {greeting} !! {username.name}</h2>}  

    <div className="flex items-center gap-3 mb-3 w-full max-w-4xl">  
      <input   
        type="text"  
        value={query}  
        onChange={(e) => setquery(e.target.value)}  
        placeholder="Search for songs..."  
        className={`p-3 rounded-md border transition-all duration-500 ease-in-out ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300 shadow-md'} w-full`}  
      />  
    </div>  

    <div className={`${rowcol ? "flex flex-col space-y-4" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"} transition-all duration-500 ease-in-out`}>  
      {search.map((song) => {  
        const songaudio = song.downloadUrl.find((file) => file.quality === "320kbps")   
          || song.downloadUrl.find((file) => file.quality === "160kbps")  
          || song.downloadUrl.find((file) => file.quality === "96kbps");  
        const songimg = song.image.find((img) => img.quality === "500x500").url;  
        const artistname = song.artists.primary.map((artist) => artist.name).join(',');  

        return (  
          <div key={song.id} className={`p-4 rounded-md w-full transition-all duration-500 ease-in-out shadow-lg ${rowcol ? "flex flex-col md:flex-row items-center gap-4" : ""} ${darkMode ? "bg-gray-800" : "bg-white border border-gray-300"}`}>  
            <img  
              src={songimg}  
              alt={song.name}  
              className={`rounded transition-all duration-500 ease-in-out ${rowcol ? "w-32 h-32 md:w-48 md:h-52" : "w-full h-48 object-cover"}`}  
            />  

            <div className={`${rowcol ? "flex flex-col justify-center w-full md:w-[50%]" : ""}`}>  
              <span className="text-lg font-semibold">{song.name}</span>  
              <p className="text-sm font-extralight">Year: {song.year}</p>  
              <p className="text-sm font-extralight">Artists: {artistname}</p>  

              <audio controls className="mt-2 w-full mb-3" ref={(el) => (audioRefs.current[song.id] = el)} onPlay={() => handlePlay(song.id)}>  
                <source src={songaudio.url || songaudio.link} type="audio/mp4" />  
              </audio>  

              <div className="flex justify-between gap-4 mt-4">  
                <button onClick={() => addplaylist(song)} className='bg-blue-400 w-full p-3 text-sm rounded-xl hover:bg-blue-600 hover:cursor-pointer transition-all duration-300 shadow-md'>Add to Playlist</button>  
                <button onClick={() => removeplaylist(song)} className='bg-blue-400 w-full p-3 text-sm rounded-xl hover:bg-blue-600 hover:cursor-pointer transition-all duration-300 shadow-md'>Remove</button>  
              </div>  
            </div>  
          </div>  
        );  
      })}  
    </div>  

    <div className="text-center mt-8">  
      <button  
        onClick={loadmore}  
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md"  
      >  
        Load More  
      </button>  
    </div>  
  </div>
  )
}

export default ApiData
