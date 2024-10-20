import React from "react";
import ThemeControl from "../../components/ThemeControl";
import bg1 from "../../assets/bg1.jpg";

import AuthServices from "../../Services/AuthServices";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await AuthServices.login(username, password);
    if (response.error == 404 || response.error == 401) {
      alert("Invalid username or password");
    } else {
     
      window.location.href = "/admin";
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center h-screen max-sm:flex-col">
        <div
          className="top-0 left-0 h-full bg-cover bg-center w-1/2 max-sm:w-full"
          style={{ backgroundImage: `url(${bg1})` }}
        ></div>

        <div className="p-10 bg-white shadow-lg rounded-lg w-1/2 m-10 max-sm:w-full">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <ThemeControl />
          <form className="mt-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="mt-3 text-center">
              If you don't have an account? Please contact the technical team.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
