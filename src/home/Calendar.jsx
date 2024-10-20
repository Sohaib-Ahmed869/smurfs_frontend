import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import {
  CalendarDateRangeIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import OpenServices from "../Services/OpenServices";

const localizer = momentLocalizer(moment);

const BookingCalendar = ({ grounds }) => {
  const [selectedGround, setSelectedGround] = useState({});

  const [showModal, setShowModal] = useState(false);
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

  const [with_lights, setWith_lights] = useState(false);

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

    await OpenServices.AddBooking(booking)
      .then((response) => {
        console.log("🚀 ~ handleAddBooking ~ response", response);
        if (response.error) {
          console.log(response.error);
        } else {
          alert("Booking added successfully");
          setShowModal(false);
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

  const [events, setevents] = useState([]);
  useEffect(() => {
    OpenServices.getBookings().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        // Format the date and time for react-big-calendar
        const formattedBookings = response.data.bookings.map((booking) => {
          // Ensure the date is formatted as YYYY-MM-DD
          const formattedDate = moment(booking.date).format("YYYY-MM-DD");

          // Combine the date with start and end times
          const startDateTime = new Date(
            `${formattedDate}T${booking.startTime}:00`
          );
          const endDateTime = new Date(
            `${formattedDate}T${booking.endTime}:00`
          );

          // Handle the time format and return the correct event format
          return {
            ...booking,
            start: startDateTime,
            end: endDateTime,
          };
        });

        console.log(formattedBookings);
        setevents(formattedBookings);
      }
    });
  }, []);

  const setSelected = (ground) => {
    if (ground === "") {
      setSelectedGround({});
      return;
    }

    const selected = grounds.find((g) => g.name === ground);
    setSelectedGround(selected);
  };

  const [filter, setFilter] = useState("");

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (filter === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.ground.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [filter, events]);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  const getPrice = (date) => {
    if (isWeekend(date)) {
      return selectedGround.weekend_rate;
    } else {
      return with_lights ? selectedGround.weekday_with_light : selectedGround.weekday_without_light;
    }
  }

  return (
    <div className="rounded-xl bg-white">
      <div className="flex items-center justify-between p-10 bg-black">
        <h1 className="text-4xl main-heading text-white">Bookings Calendar</h1>
        <button
          className="btn btn-primary rounded-full text-md"
          onClick={() => setShowModal(true)}
        >
          <PlusCircleIcon className="mr-2 h-6" />
          Add Booking
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <CalendarDateRangeIcon className="h-6" />
          <select
            name="ground"
            className="select select-bordered"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">Filter by Ground</option>
            {grounds.map((ground) => (
              <option key={ground._id} value={ground.name}>
                {ground.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="p-5 rounded-xl"
      />

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-header flex justify-between items-center">
              <h3 className="font-bold text-lg">Add New Booking</h3>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle"
              >
                <XCircleIcon className="h-6" />
              </button>
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
                        selectedGround != "" ? getPrice(new Date(newBooking.date)) : 0
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
      )}
    </div>
  );
};

export default BookingCalendar;
