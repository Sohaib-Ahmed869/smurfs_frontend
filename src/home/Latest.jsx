import React from "react";
import scholarships from "../assets/scholarships.png";

const Latest = () => {
  return (
    <div>
      <div className="bg-black">
        <div className="flex items-center justify-between p-20 max-sm:p-10 max-sm:flex-col gap-10">
          <div className="w-1/2 flex items-center justify-center max-sm:w-full">
            <img src={scholarships} alt="scholarships" className="h-[500px]" />
          </div>
          <div className="w-1/2 max-sm:w-full max-sm:mt-10">
            <h1 className="text-4xl text-white main-heading">
              Latest Scholarships
            </h1>
            <p className="text-white text-md mt-4">
              Check out the latest scholarships available for students. At
              Smurfs Football Academy, we believe in providing equal
              opportunities to all. We offer scholarships to students who show
              exceptional talent and dedication to the sport. Apply now and
              become a part of the Smurfs family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
