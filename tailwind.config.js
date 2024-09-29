/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Extra small devices
        'sm': '640px',  // Small devices (default)
        'md': '768px',  // Medium devices (default)
        'lg': '1024px', // Large devices (default)
        'xl': '1280px', // Extra large devices (default)
        '2xl': '1536px', // 2X large devices (default)
        '3xl': '1920px', // Custom screen size for very large devices
      },

      // Define custom fonts
      fontFamily: {
        sans: ['Lato', 'sans-serif'],   // Using Lato as the sans-serif font
      },

      // Define light and dark mode colors
      colors: {
        // Light mode colors
        light: {
          background: '#ffffff',  // Light background color
          text: '#333333',        // Light text color
          primary: '#9ce37d',     // Light primary color
          secondary: '#4c6663',   // Light secondary color
        },
        // Dark mode colors
        dark: {
          background: '#121212',  // Dark background color
          text: '#ffffff',        // Dark text color
          primary: '#bb86fc',     // Dark primary color
          secondary: '#03dac6',   // Dark secondary color
        },
      },
    },
  },

  // Enable dark mode with class strategy
  darkMode: 'class', // Use 'media' or 'class' to toggle dark mode
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [
      {
        smurfs: { //smurfs color pallette
          'primary': '#ECCA82',     //yellow
          'secondary': '#35363B',  //bluish gray 
          'accent': '#35363B',      //dark purple
          'neutral': '#fbf5f3',    //dark brown
          'base-100': '#ffffff',    //white
          'info': '#9ce37d',        //bright light green     
          'warning': '#ff5722',     //default (not part of smurfs color pallette)
          'fontFamily': 'Gowun Batang, sans-serif',
          'input': {
            'color': '#000000',
          }
   
        },
        smurfsDark: { //smurfs color pallette
          'primary': '#647d5c',     //sage green
          'secondary': '#4c6663',  //bluish gray 
          'accent': '#2a1e5c',      //dark purple
          'neutral': '#fbf5f3',    //dark brown
          'base-100': '#1d241c',    //black
          'base-200': '#141713',
          'base-300': '#191f18',
          'base-content': '#000000',    //white
          'info': '#9ce37d',        //bright light green     
          'warning': '#ff5722',     //default (not part of smurfs color pallette)
          'fontFamily': 'Gowun Batang, sans-serif',
          'input': {
            'color': '#ffffff',
          }

        },
        
      },
      //more themes can be added here.
    ],
    darkTheme: 'smurfsDark',
  },
}