import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const value = false;
    const navi = useNavigate();

    const clickdata = (e) => {
        if(!value){
            e.preventDefault();
            alert("You must signup first")
            navi('/signup')
        }
    }
  return (
    <div className="w-full h-screen relative">
      <img
        src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="w-full h-full flex flex-col justify-center items-center bg-black opacity-70 text-white relative z-10">
        <h2 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Feel the Beat, Live the Music</h2>
        <p className="text-lg mb-8 max-w-xl text-center">"Where words fail, music speaks. Dive into the rhythm and let your soul dance with every note."</p>

        <div className="flex space-x-8">
          <Link
            to={'/signup'}
            className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-md hover:bg-orange-600 hover:text-white transition duration-300 shadow-md"
          >
            Sign Up
          </Link>

          <Link onClick={clickdata}
            to={'/api'}
            className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-md hover:bg-orange-600 hover:text-white transition duration-300 shadow-md"
          >
            Explore Songs
          </Link>

          
        </div>
      </div>
    </div>
  )
}

export default Home
