import axios from "axios";
import AddBooking from "../Admin/Pages/addBooking";
const URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = (response) => {
  try {
    console.log("🚀 ~ handleResponse ~ response:", response);
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data, message: response.data.message };
    } else {
      alert(response.data.message);
      return { error: response.data };
    }
  } catch (error) {
    return { error: error };
  }
}

const OpenServices = {
  getGrounds: async () => {
    try {
      const response = await axios.get(`${URL}/generalBooking/getGrounds`);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  getBookings: async () => {
    try {
      const response = await axios.get(`${URL}/generalBooking/getBookings`);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  AddBooking: async (booking) => {
    try {
      const response = await axios.post(`${URL}/generalBooking/createBooking`, booking);
      return handleResponse(response);
    } catch (error) {
      console.log("🚀 ~ file: OpenServices.jsx ~ line 53 ~ AddBooking ~ error", error)
      return handleResponse(error.response);
    }
  }
  

};

export default OpenServices;