import React, {useState , useEffect} from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

const ThemeControl = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    const toggleTheme = () => {
        setIsSpinning(true);
        setTimeout(() => {
          setIsDarkMode(!isDarkMode);
          setIsSpinning(false);
        }, 300); // Duration of the spin animation
      };
    
      useEffect(() => {
        const currentTheme = isDarkMode ? "smurfsDark" : "smurfs";
        //set in localstorage
        localStorage.setItem("data-theme", currentTheme);

        document.documentElement.setAttribute("data-theme", currentTheme);
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDarkMode]);

      //when the component is loaded, check the local storage for the theme
      useEffect(() => {
        const theme = localStorage.getItem("data-theme");
        //check classList
        if (theme === "smurfs") {
          
        } else{
          if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true);
          }

        }
        if (theme === "smurfsDark") {
          setIsDarkMode(true);
        }
      }, []);


  return (
    <button
    onClick={toggleTheme} 
    className="relative inline-flex items-center rounded-full btn border-2 btn-outline btn-primary focus:outline-none transition-colors duration-300 w-24"
  >
    <span className="sr-only">Toggle Theme</span>
    <div className="flex items-center justify-center  rounded-full transition-transform duration-300 transform">
      {isDarkMode ? (
        <MoonIcon className={`w-5 h-5 text-white  ${isSpinning ? 'animate-spin' : ''}`} />
      ) : (
        <SunIcon className={`w-5 h-5 text-yellow-500 ${isSpinning ? 'animate-spin' : ''}`} />
      )}
    </div>
  </button>
  )
}

export default ThemeControl