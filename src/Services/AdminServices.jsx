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

const AdminServices = {
  getGrounds: async () => {
    try {
      const response = await axios.get(`${URL}/ground/`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  getBookings: async () => {
    try {
      const response = await axios.get(`${URL}/booking`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  addGround: async (ground) => {
    try {
      const response = await axios.post(`${URL}/ground/createGround`, ground, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  addBooking: async (booking) => {
    try {
      const response = await axios.post(`${URL}/booking`, booking, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  updateGround: async (ground) => {
    try {
      const response = await axios.put(`${URL}/ground`, ground);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  updateBooking: async (booking) => {
    try {
      const response = await axios.put(`${URL}/booking`, booking);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  deleteGround: async (id) => {
    try {
      const response = await axios.delete(`${URL}/ground/${id}`);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  cancelBooking: async (id) => {
    try {
      const response = await axios.delete(`${URL}/booking/cancel/${id}`);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  markAsPaid: async (id) => {
    try {
      //attach token
      const response = await axios.put(
        `${URL}/booking/markAsPaid/${id}`,
        null,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
  markasUnPaid: async (id) => {
    try {
      const response = await axios.put(`${URL}/booking/markAsUnpaid/${id}`);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
};

export default AdminServices;
