import React, { useState } from "react";
import logo from "../assets/logo.png";

const CTA = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ground, setGround] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //book your spot today with calendar
  return (
    <div className="bg-white bg-opacity-20 text-black rounded-2xl">
      <div className="flex items-center justify-between p-20">
        <div className="w-1/2 text-white">
          <img src={logo} alt="logo" className="h-36" />
          <h1 className="text-4xl main-heading">Book Your Spot Today</h1>
          <p className="text-md mt-4">
            Book your spot today and enjoy the beautiful game of football.<br></br> We
            have a state of the art football ground with all the facilities you
            need to enjoy the beautiful game.<br></br> We offer a structured and supportive environment
            for the players to enhance their football skills and<br></br> become a part of the Smurfs family.
          </p>
        </div>
        <form className="w-1/2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered"
              placeholder="Select Date"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered"
              placeholder="Select Time"
            />
            <input
              type="text"
              value={ground}
              onChange={(e) => setGround(e.target.value)}
              className="input input-bordered"
              placeholder="Select Ground"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              placeholder="Your Name"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered"
              placeholder="Your Phone"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              placeholder="Your Email"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea textarea-bordered"
              placeholder="Your Message"
            ></textarea>
          </div>
            <button className="btn btn-primary mt-4 w-full">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default CTA;
