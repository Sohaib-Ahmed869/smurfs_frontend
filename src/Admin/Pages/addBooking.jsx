import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import { Modal } from "react-bootstrap";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ImCross } from "react-icons/im";
import { IoIosDoneAll } from "react-icons/io";
import AdminSiderbar from "../Components/siderbar";

const grounds = [
  {
    name: "Askari 4",
    location: "Askari 4",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
    slotTimings: "90",
    weekend_rate: 3500,
    reserved_timings: "05:00 PM - 06:30 PM",
    weekday_with_light: 2800,
    weekday_without_light: 2500,
    weekend_after_midnight: 4000,
  },
  {
    name: "Rad Arena Askari 10",
    location: "Askari 10",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
    slotTimings: "90",
    weekend_rate: 3000,
    reserved_timings: "07:00 AM - 03:00 PM",
    weekday_with_light: 3000,
    weekday_without_light: 3000,
    weekend_after_midnight: 3000,
  },
  {
    name: "Askari 2",
    location: "Askari 2",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
    slotTimings: "90",
    weekend_rate: 2400,
    reserved_timings: "05:00 PM - 07:00 PM",
    weekday_with_light: 2400,
    weekday_without_light: 2000,
    weekend_after_midnight: 2400,
  },
  {
    name: "DHA-1 Roots",
    location: "DHA-1 Roots",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
    slotTimings: "90",
    weekend_rate: 3600,
    reserved_timings: "07:00 AM - 03:00 PM",
    weekday_with_light: 3600,
    weekday_without_light: 3000,
    weekend_after_midnight: 3200,
  },
];

const Reminders = [
  {
    title: "Booking Reminder",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 4",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Reminder",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 4",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Reminder",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 10",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Reminder",
    time: "10:00 AM",
    date: "25th September 2024",
    ground: "Askari 2",
    customerName: "John Doe",
    price: 500,
  },
];

const AddBooking = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [alreadyBookedModal, setAlreadyBookedModal] = useState(false);
  const [bookingDoneModal, setBookingDoneModal] = useState(false);
  const [selectedGround, setSelectedGround] = useState(grounds[0]);

  const handleSave = () => {
    setConfirmModal(true);
  };

  const checkBooking = () => {
    const time = document.querySelector('input[type="time"]').value;
    const date = document.querySelector('input[type="date"]').value;
    const ground = selectedGround.name;
    const isBooked = Reminders.some(
      (reminder) =>
        reminder.time === time &&
        reminder.date === date &&
        reminder.ground === ground
    );
    if (isBooked) {
      setAlreadyBookedModal(true);
    } else {
      setBookingDoneModal(true);
    }
  };

  const [selectedGroundReminders, setSelectedGroundReminders] = useState([]);

  useEffect(() => {
    setSelectedGroundReminders(
      Reminders.filter((reminder) => reminder.ground === selectedGround.name)
    );
  }, [selectedGround]);

  return (
    <div className="p-20">
      <ThemeControl />
      <AdminSiderbar />
      <div className="flex items-center justify-between gap-10">
        <div className="mt-4 w-1/2 border p-4 rounded-xl shadow-sm">
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
        <div className="mt-4 w-1/2">
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
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <table className="table w-full mt-4">
          <thead>
            <tr>
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
                <td>{reminder.time}</td>
                <td>{reminder.date}</td>
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
