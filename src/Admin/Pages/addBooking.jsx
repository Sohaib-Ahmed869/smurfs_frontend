import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import { Modal } from "react-bootstrap";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ImCross } from "react-icons/im";
import { IoIosDoneAll } from "react-icons/io";
import AdminSiderbar from "../Components/siderbar";
import AdminServices from "../../Services/AdminServices";
import { XCircleIcon } from "@heroicons/react/20/solid";

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

  const [with_lights, setWith_lights] = useState(false);

  //get bookings of selected ground
  useEffect(() => {
    setSelectedGroundReminders(
      Reminders.filter((reminder) => reminder.ground === selectedGround.name)
    );
  }, [selectedGround]);

  const [newBooking, setNewBooking] = useState({
    title: new Date().toDateString(),
    date: "",
    ground: "",
    customerName: "",
    phone: "",
    email: "",
    price: "",
    duePayment: "",
    paid: false,
    paymentMethod: "",
    status: "Unapproved",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ handleAddBooking ~ newBooking", newBooking);
    const booking = {
      title: new Date().toDateString(),
      customerName: newBooking.customerName,
      phone: newBooking.phone,
      email: newBooking.email,
      price: newBooking.price,
      ground: selectedGround.name,
      date: new Date(newBooking.date),
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
      status: "Unapproved",
      paid: false,
      paymentMethod: newBooking.paymentMethod,
    };

    await AdminServices.addBooking(booking)
      .then((response) => {
        console.log("🚀 ~ handleAddBooking ~ response", response);
        if (response.error) {
          console.log(response.error);
        } else {
          alert("Booking added successfully");

          setNewBooking({
            title: new Date().toDateString(),
            date: "",
            ground: "",
            customerName: "",
            phone: "",
            email: "",
            price: "",
            duePayment: "",
            paid: false,
            paymentMethod: "",
            status: "Unapproved",
            startTime: "",
            endTime: "",
          });
        }
      })
      .catch((error) => {
        console.log("🚀 ~ handleAddBooking ~ error", error);
      });
  };

  //when selected ground is changed update the price and due payment
  useEffect(() => {
    const isWeekend = [0, 6].includes(new Date(newBooking.date).getDay());
    setNewBooking({
      ...newBooking,
      price: isWeekend
        ? selectedGround.weekend_rate
        : with_lights === true
        ? selectedGround.weekday_with_light
        : selectedGround.weekday_without_light,
      duePayment: isWeekend
        ? selectedGround.weekend_rate * 0.1
        : with_lights === true
        ? selectedGround.weekday_with_light * 0.1
        : selectedGround.weekday_without_light * 0.1,
    });
  }, [selectedGround, newBooking.date]);

  const getPrice = (date) => {
    if (isWeekend(date)) {
      return selectedGround.weekend_rate;
    } else {
      return with_lights
        ? selectedGround.weekday_with_light
        : selectedGround.weekday_without_light;
    }
  };

  const setSelected = (ground) => {
    if (ground === "") {
      setSelectedGround({});
      return;
    }

    const selected = grounds.find((g) => g.name === ground);
    setSelectedGround(selected);
  };

  const isWeekend = (date) => {
    return [0, 6].includes(date.getDay());
  };

  //do pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReminders = selectedGroundReminders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="modal-body">
            <form className="form-control" onSubmit={handleAddBooking}>
              <div className="flex items-center gap-3">
                <div className="form-control w-1/2">
                  <label className="label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered"
                    onChange={handleInputChange}
                    value={newBooking.date}
                    required
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">Ground</label>
                  <select
                    name="ground"
                    className="select select-bordered"
                    onChange={(e) => setSelected(e.target.value)}
                    value={selectedGround.name}
                    required
                  >
                    <option value="">Select Ground</option>
                    {grounds.map((ground) => (
                      <option key={ground._id} value={ground.name}>
                        {ground.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="form-control w-1/3">
                  <label className="label">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    className="input input-bordered"
                    onChange={handleInputChange}
                    value={newBooking.startTime}
                    required
                  />
                </div>
                <div className="form-control w-1/3">
                  <label className="label">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    className="input input-bordered"
                    onChange={handleInputChange}
                    value={newBooking.endTime}
                    required
                  />
                </div>
                <div className="w-1/3 flex items-center">
                  <input
                    type="checkbox"
                    name="with_lights"
                    onChange={(e) => setWith_lights(e.target.checked)}
                    value={with_lights}
                  />
                  <label className="label">With Lights</label>
                </div>
              </div>
              <div className="form-control">
                <label className="label">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  className="input input-bordered"
                  onChange={handleInputChange}
                  value={newBooking.customerName}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="form-control w-1/2">
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="input input-bordered"
                    onChange={handleInputChange}
                    value={newBooking.phone}
                    required
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered"
                    onChange={handleInputChange}
                    value={newBooking.email}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="form-control w-1/2">
                  <label className="label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="input input-bordered"
                    value={
                      selectedGround != ""
                        ? getPrice(new Date(newBooking.date))
                        : 0
                    }
                    disabled
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">Due Payment</label>
                  <input
                    type="number"
                    name="duePayment"
                    className="input input-bordered"
                    value={
                      selectedGround != ""
                        ? selectedGround.weekend_rate * 0.1
                        : 0
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">Payment Method</label>
                <select
                  name="paymentMethod"
                  className="select select-bordered"
                  onChange={handleInputChange}
                  value={newBooking.paymentMethod}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer mt-4">
            <button
              className="btn btn-primary w-full"
              type="submit"
              onClick={handleAddBooking}
            >
              Add Booking
            </button>
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
            {currentReminders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No reminders found
                </td>
              </tr>
            )}
            {currentReminders.map((reminder, index) => (
              <tr key={index}>
                <td>Booking Reminder</td>
                <td>
                  {reminder.startTime} - {reminder.endTime}
                </td>
                <td>{new Date(reminder.date).toDateString()}</td>
                <td>{reminder.ground}</td>
                <td>{reminder.customerName}</td>
                <td>{reminder.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav className="flex items-center gap-4">
            <ul className="pagination flex gap-4">
              {Array.from(
                {
                  length: Math.ceil(
                    selectedGroundReminders.length / itemsPerPage
                  ),
                },
                (_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
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
