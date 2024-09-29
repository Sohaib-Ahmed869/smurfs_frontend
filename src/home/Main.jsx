import React from "react";
import ThemeControl from "../components/ThemeControl";
import ground from "../assets/groundedited.jpg";
import groundnight from "../assets/groundnight.jpg";
import logo from "../assets/logo.png";
import Latest from "./Latest";
import CTA from "./CTA";
import Footer from "./Footer";
import "../App.css";
import { IoCall } from "react-icons/io5";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

const Main = () => {
  return (
    <div>
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${ground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="flex items-center justify-between p-20">
          <img src={logo} alt="logo" className="h-36" />
          <ThemeControl />
          <button className="btn btn-primary rounded-full">Book a Spot</button>
        </div>
        <div className="flex flex-col items-center text-center p-20">
          <h1 className="text-6xl text-white main-heading">
            Welcome to The Smurfs Football Club
          </h1>
          <p className="text-white text-xl mt-4">
            We are a football club based in the heart of the city. <br></br>We
            have a state of the art football ground with all the facilities you
            need to enjoy the beautiful game.
          </p>
          <div className="flex items-center gap-3">
            <button className="btn btn-primary rounded-full mt-4 text-md">
              <IoCall className="mr-2" />
              Call Us Now
            </button>
            <button className="btn btn-primary rounded-full mt-4 text-md">
              <CalendarDaysIcon className="mr-2 h-6" />
              Book a Spot
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black text-white">
        <div className="flex items-center justify-between p-20">
          <div className="w-1/2">
            <h1 className="text-4xl main-heading">
              The Biggest Football Academy in Pakistan
            </h1>
            <p className="text-md mt-4">
              Smurfs Football Academy is a premier youth football training
              academy dedicated to nurturing and developing young talents in the
              world of soccer. Our academy offers a structured and supportive
              environment where boys and girls of all skill levels, ranging from
              beginners to advanced players, can enhance their football
              abilities, learn teamwork, and build character. At Smurfs Football
              Academy, we focus on providing top-quality coaching, using
              state-of-the-art facilities, and implementing modern training
              techniques to ensure holistic development both on and off the
              field.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img src={logo} alt="logo" className="h-[300px]" />
          </div>
        </div>
      </div>
      <div className="w-full p-20 bg-black">
        <CTA />
      </div>
      <Latest />
      <Footer />
    </div>
  );
};

export default Main;
