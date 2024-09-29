import React from "react";
import ThemeControl from "../../components/ThemeControl";
import AdminSiderbar from "../Components/siderbar";
import { IoIosDoneAll } from "react-icons/io";
import { Modal } from "react-bootstrap";
const Reminders = [
  {
    title: "Booking Request",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 4",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Request",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 4",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Request",
    time: "10:00 AM",
    date: "12th August 2021",
    ground: "Askari 10",
    customerName: "John Doe",
    price: 500,
  },
  {
    title: "Booking Request",
    time: "10:00 AM",
    date: "25th September 2024",
    ground: "Askari 2",
    customerName: "John Doe",
    price: 500,
  },
];

const Approval = () => {
  const [show, setShow] = React.useState(false);
  const [approvedModal, setApprovedModal] = React.useState(false);
  const [selectedReminder, setSelectedReminder] = React.useState({});
  const handleClose = () => setShow(false);
  const handleShow = (reminder) => {
    setSelectedReminder(reminder);
    setShow(true);
  };
  return (
    <div>
      <div className="flex">
        <AdminSiderbar />
        <div className="w-full p-20">
          <ThemeControl />
          <h1 className="text-4xl mt-4 mb-4 main-heading">Booking Requests</h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 sm:grid-cols-1">
            {Reminders.map((reminder) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:transform hover:scale-105 transition-transform"
                key={reminder.date}
                onClick={() => handleShow(reminder)}
              >
                <div>
                  <h1 className="text-xl">{reminder.title}</h1>
                  <p>
                    <span className="font-semibold">Time:</span> {reminder.time}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {reminder.date}
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
                    <span className="font-semibold">Price:</span>{" "}
                    {reminder.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(show || approvedModal) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => {
            setShow(false);
            setApprovedModal(false);
          }}
        >
          <div className="bg-white p-4 rounded-lg"></div>
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg  w-1/3"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedReminder.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className="font-semibold">Time:</span> {selectedReminder.time}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {selectedReminder.date}
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
          <button className="btn btn-primary mt-4 btn-md w-full"
            onClick={() => {
              setApprovedModal(true);
              setShow(false);
            }}
          >Approve</button>
        </Modal.Body>
      </Modal>

      <Modal
        show={approvedModal}
        onHide={() => setApprovedModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Approved</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center">
            <IoIosDoneAll className="text-9xl text-green-500" />
          </div>
          <p className="text-center text-2xl">Booking Approved</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Approval;
