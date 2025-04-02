import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import SignUp from './Components/SignUp'
import ApiData from './Components/ApiData'
import NavBar from './Components/NavBar'
import LogIn from './Components/LogIn'
import PlayList from './Components/PlayList'
import Footer from './Components/Footer'
import SideMenu from './Components/SideMenu'
import PunjabiSongs from './Components/PunjabiSongs'
import TamilSongs from './Components/TamilSongs'


const App = () => {
  return (
   <BrowserRouter>
    <NavBar/>
    
      <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/signup' element ={<SignUp/>} />
          <Route path='/api' element ={<ApiData/>} />
          <Route path='/login' element ={<LogIn/>} />
          <Route path='/playlist' element ={<PlayList/>} />
          <Route path='/sidemenu' element ={<SideMenu/>} />
          <Route path='/punjabi' element ={<PunjabiSongs/>} />
          <Route path='/tamil' element ={<TamilSongs/>} />
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
