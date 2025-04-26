import React from "react";
import Logo from '../assets/imdb.svg' // Make sure to add the IMDB logo in assets
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="bg-[#121212] text-white">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to='/' className="hover:opacity-80">
              <img 
                className="w-[90px]" 
                src={Logo} 
                alt="IMDB Logo"
              />
            </Link>
            <Link to = '/'>
            <div className="text-[#f5c518] font-bold text-xl">
              Movies Hub
            </div>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <nav className="flex items-center space-x-8">
            <Link to="/" className="hover:text-[#f5c518] font-medium">
              Home
            </Link>
            <Link to="/watchlist" className="hover:text-[#f5c518] font-medium">
              Watchlist
            </Link>
            <Link to="/recommend" className="hover:text-[#f5c518] font-medium">
              Recommendations
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;


