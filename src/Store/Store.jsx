import { configureStore } from "@reduxjs/toolkit";
import Playlistdata from "../Slice/Playlistdata"
import Theme from "../Slice/Theme"

export const store = configureStore ({
    reducer: {
      playlist: Playlistdata,  
      theme: Theme,
    }   
})