import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import { Modal } from "react-bootstrap";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ImCross } from "react-icons/im";
import { IoIosDoneAll } from "react-icons/io";
import AdminSiderbar from "../Components/siderbar";
import AdminServices from "../../Services/AdminServices";

const AddBooking = () => {
  const [grounds, setGrounds] = useState([]);

  const [selectedGroundReminders, setSelectedGroundReminders] = useState([]);

  const [Reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);

  const [confirmModal, setConfirmModal] = useState(false);
  const [alreadyBookedModal, setAlreadyBookedModal] = useState(false);
  const [bookingDoneModal, setBookingDoneModal] = useState(false);
  const [selectedGround, setSelectedGround] = useState({});

  const handleSave = () => {
    setConfirmModal(true);
  };

  const getGrounds = () => {
    AdminServices.getGrounds().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        setGrounds(response.data.grounds);
        setSelectedGround(response.data.grounds[0]);
      }
    });
  };

  useEffect(() => {
    getGrounds();
  }, []);

  const getBookings = () => {
    AdminServices.getBookings().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        setReminders(response.data.bookings);
      }
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  //get bookings of selected ground
  useEffect(() => {
    setSelectedGroundReminders(
      Reminders.filter((reminder) => reminder.ground === selectedGround.name)
    );
  }, [selectedGround]);

  return (
    <div className="p-20 max-sm:p-5 bg-gray-100">
      <ThemeControl />
      <AdminSiderbar />
      <div className="flex items-center justify-between gap-10 max-sm:flex-col">
        <div className="mt-4 w-1/2 border p-4 rounded-xl shadow-sm max-sm:w-full bg-white">
          <h1 className="text-2xl font-bold">Ground Information</h1>
          <table className="table w-full mt-4">
            <tbody>
              <tr>
                <td>Location</td>
                <td>{selectedGround.location}</td>
              </tr>
              <tr>
                <td>Size Width</td>
                <td>{selectedGround.sizeWidth}</td>
              </tr>
              <tr>
                <td>Size Length</td>
                <td>{selectedGround.sizeLength}</td>
              </tr>
              <tr>
                <td>Slot Timings</td>
                <td>{selectedGround.slotTimings}</td>
              </tr>
              <tr>
                <td>Weekend Rate</td>
                <td>{selectedGround.weekend_rate}</td>
              </tr>
              <tr>
                <td>Reserved Timings</td>
                <td>{selectedGround.reserved_timings}</td>
              </tr>
              <tr>
                <td>Weekday with Light</td>
                <td>{selectedGround.weekday_with_light}</td>
              </tr>
              <tr>
                <td>Weekday without Light</td>
                <td>{selectedGround.weekday_without_light}</td>
              </tr>
              <tr>
                <td>Weekend After Midnight</td>
                <td>{selectedGround.weekend_after_midnight}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 w-1/2 max-sm:w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Add Booking</h1>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Select Ground</label>
            <select
              value={selectedGround.name}
              onChange={(e) =>
                setSelectedGround(
                  grounds.find((ground) => ground.name === e.target.value)
                )
              }
              className="input input-bordered w-full mt-1"
            >
              {grounds.map((ground) => (
                <option key={ground.name}>{ground.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Select Time</label>
            <input type="time" className="input input-bordered w-full mt-1" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Select Date</label>
            <input type="date" className="input input-bordered w-full mt-1" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Select Customer</label>
            <input type="text" className="input input-bordered w-full mt-1" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Price</label>
            <input type="number" className="input input-bordered w-full mt-1" />
          </div>
        </div>
      </div>
      <div className="mt-10 max-sm:hidden">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <table className="table text-lg w-full mt-4">
          <thead>
            <tr className="bg-secondary text-white text-md">
              <th>Title</th>
              <th>Time</th>
              <th>Date</th>
              <th>Ground</th>
              <th>Customer Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedGroundReminders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No reminders found
                </td>
              </tr>
            )}
            {selectedGroundReminders.map((reminder, index) => (
              <tr key={index}>
                <td>{reminder.title}</td>
                <td>{new Date(reminder.date).toLocaleTimeString()}</td>
                <td>{new Date(reminder.date).toDateString()}</td>
                <td>{reminder.ground}</td>
                <td>{reminder.customerName}</td>
                <td>{reminder.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(confirmModal || alreadyBookedModal || bookingDoneModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg"></div>
        </div>
      )}
      <Modal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg"
      >
        <Modal.Body>
          <QuestionMarkCircleIcon className="w-20 h-20 text-primary mx-auto mb-4" />
          <p>Are you sure you want to confirm this booking?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4 mt-10">
          <button
            className="btn btn-primary"
            onClick={() => {
              setConfirmModal(false);
              checkBooking();
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setConfirmModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={alreadyBookedModal}
        onHide={() => setAlreadyBookedModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg"
      >
        <Modal.Body className="text-center">
          <ImCross className="w-10 h-10 text-warning mx-auto mb-4" />

          <p>
            The selected ground is already booked at the selected time and date.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary mt-3 w-full"
            onClick={() => setAlreadyBookedModal(false)}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={bookingDoneModal}
        onHide={() => setBookingDoneModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg"
      >
        <Modal.Body className="text-center">
          <IoIosDoneAll className="w-10 h-10 text-success mx-auto mb-4" />

          <p>Booking done successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary mt-3 w-full"
            onClick={() => setBookingDoneModal(false)}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddBooking;
