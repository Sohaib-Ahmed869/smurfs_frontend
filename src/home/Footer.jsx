import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800">
      <div className="flex items-center justify-between p-20">
        <div className="w-3/4 p-10">
          <h1 className="text-4xl text-white main-heading">Smurfs Football Academy</h1>
          <p className="text-white text-sm mt-4 w-1/2">
            Smurfs Football Academy is a football academy that provides a structured and supportive environment for the players to enhance their football skills and become a part of the Smurfs family. We offer a state of the art football ground with all the facilities you need to enjoy the beautiful game.
          </p>
        </div>
        <div className="w-1/4">
          <h1 className="text-4xl text-white main-heading">Contact Us</h1>
          <p className="text-white text-md mt-4">
            Address: Smurfs Village, Football Ground, Smurfs Country
            <br></br>
            Phone: +1234567890
            <br></br>
            Email: {" "}
            <a href="mailto:smurfs@gmail.com" className="text-white">
               smurf@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;