import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ImCross } from "react-icons/im";
import AdminSiderbar from "../Components/siderbar";
import AdminServices from "../../Services/AdminServices";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [show, setShow] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShow(true);
  };

  const getBookings = () => {
    AdminServices.getBookings().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      }
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const [grounds, setGrounds] = useState([]);

  const [selectedGround, setSelectedGround] = useState("");

  useEffect(() => {
    AdminServices.getGrounds().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setGrounds(response.data.grounds);
      }
    });
  }, []);

  const handleFilter = (e) => {
    setSelectedGround(e.target.value);
    if (e.target.value === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.ground === e.target.value)
      );
    }
  };

  return (
    <div>
      <AdminSiderbar />
      <div className="w-full p-20 max-sm:p-5">
        <h1 className="text-4xl mt-4 mb-4 main-heading flex items-center">
          <QuestionMarkCircleIcon className="h-10 w-10 text-secondary mr-4" />
          Bookings
        </h1>
        <div className="mb-10">
          <label className="text-gray-600">Filter by Ground</label>
          <select
            className="input input-bordered w-full"
            onChange={handleFilter}
            value={selectedGround}
          >
            <option value="all">All</option>
            {grounds.map((ground) => (
              <option key={ground._id} value={ground.name}>
                {ground.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col text-md"
            >
              <h1>Ground: {booking.ground}</h1>
              <h1>User: {booking.customerName}</h1>
              <h1>Date: {booking.date}</h1>
              <h1>Start Time: {booking.startTime}</h1>
              <h1>End Time: {booking.endTime}</h1>
              <h1>Status: {booking.status}</h1>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleShow(booking)}
                  className="btn btn-primary"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            {/* Modal content */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-1/2 relative z-20">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl">Booking Details</h1>
                <ImCross
                  onClick={handleClose}
                  className="h-6 w-6 text-danger cursor-pointer"
                />
              </div>
              <div className="mt-4">
                <h1>Ground: {selectedBooking.ground}</h1>
                <h1>User: {selectedBooking.customerName}</h1>
                <h1>Date: {selectedBooking.date}</h1>
                <h1>Start Time: {selectedBooking.startTime}</h1>
                <h1>End Time: {selectedBooking.endTime}</h1>
                <h1>Status: {selectedBooking.status}</h1>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={handleClose} className="btn btn-danger">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
