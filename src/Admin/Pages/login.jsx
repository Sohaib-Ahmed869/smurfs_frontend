import React from "react";
import ThemeControl from "../../components/ThemeControl";
import bg1 from "../../assets/bg1.jpg";

const Login = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center h-screen">
        <div
          className="top-0 left-0 h-full bg-cover bg-center w-1/2"
          style={{ backgroundImage: `url(${bg1})` }}
        ></div>

        <div className="p-10 bg-white shadow-lg rounded-lg w-1/2 m-10">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <ThemeControl />
          <form className="mt-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Enter your password"
              />
              <div className="flex justify-end">
                <a href="#" className="text-sm text-accent hover:text-accent">
                  Contact the technical team in case of any issue
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-accent hover:bg-accent focus:ring-4 focus:ring-accent focus:outline-none text-white font-medium text-sm rounded-md shadow-sm"
            >
              Login
            </button>
            <p className="mt-3 text-center">
              If you don't have an account?{" "}
              Please contact the technical team.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
