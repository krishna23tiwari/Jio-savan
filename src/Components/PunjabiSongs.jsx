import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import UseGrid from '../Context/UseGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addsong, removesong } from '../Slice/Playlistdata';
import SideMenu from './SideMenu';




const PunjabiSongs = () => {
    const [search, setsearch] = useState([])
    const [page, setpage] = useState(false)
    const [query, setquery] = useState('')
    const [menuopen, setmenuopen] = useState(false)

    const {rowcol, handleGrid} = UseGrid();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const audioref =  useRef({});

   useEffect(() => {
    fetchapi();
    
   },[])
    

    const fetchapi = (pagenumber = 1) => {
        setTimeout(async() => {
            try {
                const response = await axios.get('https://saavn.dev/api/search/songs',{
                    params:{query : query ||  'Punjabi', limit: 12, page: pagenumber}
                });

                const songs = response.data.data.results;

                
                setsearch((prev) => pagenumber === 1 ? songs:[...prev, ...songs])
                console.log(songs)
                
            } catch (error) {
                console.error(error, "data missimg")
            }
        }, 1000);
    }

    const loadmore = () => {
      const nextpage = page + 1;
      setpage(nextpage);
      fetchapi(nextpage)
    }


  return (
    <div>
      <div>
        <div>
        <input   
        type="text"  
        value={query}  
        onChange={(e) => setquery(e.target.value)}  
        placeholder="Search for songs..."  
   
      />  
        </div>
      {search.map((song) => {
       const artistname = song.artists.primary.map((artist) => artist.name).join(',') 
       const songimage = song.image.find((img) => img.quality === '500x500').url;

       const songaudio = song.downloadUrl.find((file) => file.quality === '320kbps')
        || song.downloadurl.find((file) => file.quality === '160kbps')
        || song.downloadurl.find((file) => file.quality === '96kbps')

        return (
            <div key={song.id}>
             <img
                src={songimage}
                alt={song.name}
             />
                <p>{artistname}</p>

                <div>
                  <audio controls>
                  
                    <source src= {songaudio.url || songaudio.link} type = "audio/mp4"/>
                  </audio>
                </div>
            </div>
        )
      })}

      <div onClick={loadmore}>
        <button>Load More</button>
      </div>
        
      </div>
    </div>
  )
}

export default PunjabiSongs


