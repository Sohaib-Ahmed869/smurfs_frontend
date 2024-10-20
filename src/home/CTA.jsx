import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Modal } from "react-bootstrap";

const CTA = () => {
  //book your spot today with calendar
  return (
    <div className="bg-white bg-opacity-20 text-black rounded-2xl">
      <div className="w-full text-white max-sm:w-full flex flex-col items-center text-center p-10">
        <img src={logo} alt="logo" className="h-36 w-36" />
        <h1 className="text-4xl main-heading">Book Your Spot Today</h1>
        <p className="text-md mt-4">
          Book your spot today and enjoy the beautiful game of football.
          <br></br> We have a state of the art football ground with all the
          facilities you need to enjoy the beautiful game.<br></br> We offer a
          structured and supportive environment for the players to enhance their
          football skills and<br></br> become a part of the Smurfs family.
        </p>
      </div>
    </div>
  );
};

export default CTA;
