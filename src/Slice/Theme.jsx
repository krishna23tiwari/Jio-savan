import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,  // Default to light mode
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;  // Toggle theme state
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));  // Save to localStorage
    },
    loadTheme: (state) => {
      const savedTheme = JSON.parse(localStorage.getItem("darkMode"));
      if (savedTheme !== null) {
        state.darkMode = savedTheme;
      }
    },
  },
});

export const { toggleTheme, loadTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
