import React, { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={`navMainContainer ${darkMode ? 'dark' : 'light'}`}>
        <div className="navBarLogo">HappyAlgo</div>
        
        <ul className="navMenu">
          <li>Home</li>
          <li>About Us</li>
          <li>Help</li>
        </ul>

        <div className="navSearchBar">
          <div className="inputSearchBar"></div>
          <button></button>
        </div>

        <div className="lightMode" onClick={toggleMode}>
          {darkMode ? '🌙 Dark Mode On' : '☀️ Light Mode On'}
        </div>
      </div>
    </>
  );
}

export default Navbar;
