import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = (response) => {
  try {
    console.log("🚀 ~ handleResponse ~ response:", response);
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data, message: response.data.message };
    } else {
      return { error: response.message };
    }
  } catch (error) {
    return { error: error };
  }
};

const AuthServices = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });
      console.log("🚀 ~ login ~ response", response);
      //store token in local storage
      localStorage.setItem("token", response.data.token);
      return handleResponse(response);
    } catch (error) {
      console.log("🚀 ~ login ~ response", error.message);
      return { error: error.status };
    }
  },
};

export default AuthServices;
