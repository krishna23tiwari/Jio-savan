import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import UseGrid from '../Context/UseGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addsong, removesong } from '../Slice/Playlistdata';
import SideMenu from './SideMenu';



const EnglishSongs = () => {
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
                    params:{query: 'English', limit: 12, page: pagenumber}
                });

                const songs = response.data.data.results;
                setsearch((prev) => pagenumber === 1 ? songs:[...prev,...songs])
                console.log(songs)
                
            } catch (error) {
                
            }
        }, 1000);
    }


  return (
    <div>
      <h1>hello english songs</h1>
    </div>
  )
}

export default EnglishSongs


