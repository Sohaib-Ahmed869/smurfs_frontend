import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import AdminSiderbar from "../Components/siderbar";
import { IoIosDoneAll } from "react-icons/io";
import AdminServices from "../../Services/AdminServices";
import { CiSquareQuestion } from "react-icons/ci";
import { MdOutlineHourglassEmpty } from "react-icons/md";
const Approval = () => {
  const [show, setShow] = useState(false);
  const [approvedModal, setApprovedModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState({});

  const handleShow = (reminder) => {
    setSelectedReminder(reminder);
    setShow(true);
  };

  const [Reminders, setReminders] = useState([]);

  const getBookings = () => {
    AdminServices.getBookings().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setReminders(
          response.data.bookings.filter(
            (booking) => booking.status === "Unapproved"
          )
        );
      }
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleApprove = async () => {
    const response = await AdminServices.markAsPaid(selectedReminder._id);
    if (response.error) {
      console.log(response.error);
    } else {
      setApprovedModal(true);
      //get updated bookings
      getBookings();
    }
  };

  return (
    <div>
      <div className="flex">
        <AdminSiderbar />
        <div className="w-full p-20 max-sm:p-5">
          <h1 className="text-4xl mt-4 mb-4 main-heading flex items-center">
            <CiSquareQuestion className="h-10 w-10 text-secondary mr-4" />
            Booking Requests</h1>
          {Reminders.length === 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <MdOutlineHourglassEmpty className="text-9xl text-gray-300" />
              <h1 className="text-xl">No Booking Requests waiting for approval</h1>
            </div>
          )}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 sm:grid-cols-1">
            {Reminders.map((reminder) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:transform hover:scale-105 transition-transform"
                key={reminder._id}
                onClick={() => handleShow(reminder)}
              >
                <div>
                  <h1 className="text-xl">Reminder</h1>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {reminder.startTime} - {reminder.endTime}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(reminder.date).toDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Ground:</span>{" "}
                    {reminder.ground}
                  </p>
                  <p>
                    <span className="font-semibold">Customer Name:</span>{" "}
                    {reminder.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {reminder.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {reminder.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    {reminder.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Booking Details */}
      {show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-header flex justify-between items-center">
              <h3 className="font-bold text-lg">{selectedReminder.title}</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setShow(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {selectedReminder.startTime}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedReminder.date}
              </p>
              <p>
                <span className="font-semibold">Ground:</span>{" "}
                {selectedReminder.ground}
              </p>
              <p>
                <span className="font-semibold">Customer Name:</span>{" "}
                {selectedReminder.customerName}
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                {selectedReminder.price}
              </p>
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={() => {
                  handleApprove();
                  setShow(false);
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Approved Confirmation */}
      {approvedModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-header flex justify-between items-center">
              <h3 className="font-bold text-lg">Approved</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setApprovedModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="flex items-center justify-center">
                <IoIosDoneAll className="text-9xl text-green-500" />
              </div>
              <p className="text-center text-2xl">Booking Approved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approval;
