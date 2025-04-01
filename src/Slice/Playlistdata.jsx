import { createSlice } from "@reduxjs/toolkit";

const PlaylistSlice = createSlice({
  name: "playlist",
  initialState: { songs: [] },
  reducers: {
    addsong: (state, { payload }) => {
      if (!state.songs.find(song => song.id === payload.id)) {
        state.songs.push(payload);
      }
    },
    removesong: (state, { payload }) => {
      state.songs = state.songs.filter(song => song.id !== payload.id);
    },
    setSongs: (state, { payload }) => {
      state.songs = payload;
    }
  },
});

export const { addsong, removesong, setSongs } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;


