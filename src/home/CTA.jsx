import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Modal } from "react-bootstrap";

const CTA = () => {
 
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ground, setGround] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [selectedGround, setSelectedGround] = useState({});

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  const onSubmit = () => {
    if(date && time && ground && name && phone && email){
      //if date is not valid
      if(new Date(date).getFullYear() < new Date().getFullYear() || new Date(date).getMonth() < new Date().getMonth() || new Date(date).getDate() < new Date().getDate()){
        console.log(new Date(date), new Date());
        alert("Invalid Date");
        //if time is not valid
        if(new Date().getHours() > parseInt(time.split(":")[0])){
          alert("Invalid Time");
          return;
        }
        return;
      }
      //if date is today
      if(new Date(date).getFullYear() === new Date().getFullYear() && new Date(date).getMonth() === new Date().getMonth() && new Date(date).getDate() === new Date().getDate()){
        //if time is not valid
        if(new Date().getHours() > parseInt(time.split(":")[0])){
          alert("Invalid Time");
          return
        }
      }

      //if the time is in reserved timings
      if(selectedGround.reserved_timings){
        const reserved_timings = selectedGround.reserved_timings.split(" - ");
        if(parseInt(time.split(":")[0]) >= parseInt(reserved_timings[0].split(":")[0]) && parseInt(time.split(":")[0]) <= parseInt(reserved_timings[1].split(":")[0])){
          alert("This time is reserved");
          return;
        }
      }

      
      setShow(true);
    }
    else{
      alert("Please fill all the fields");
    }
  }


  //book your spot today with calendar
  return (
    <div className="bg-white bg-opacity-20 text-black rounded-2xl">
      <div className="flex items-center justify-between p-20 max-sm:p-4 max-sm:flex-col gap-10">
        <div className="w-1/2 text-white max-sm:w-full">
          <img src={logo} alt="logo" className="h-36" />
          <h1 className="text-4xl main-heading">Book Your Spot Today</h1>
          <p className="text-md mt-4">
            Book your spot today and enjoy the beautiful game of football.
            <br></br> We have a state of the art football ground with all the
            facilities you need to enjoy the beautiful game.<br></br> We offer a
            structured and supportive environment for the players to enhance
            their football skills and<br></br> become a part of the Smurfs
            family.
          </p>
        </div>
        <form className="w-1/2 max-sm:w-full max-sm:mt-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered"
              placeholder="Select Date"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered"
              placeholder="Select Time"
            />
            <select
              value={ground}
              onChange={(e) => {
                setGround(e.target.value);
                setSelectedGround(grounds.find((g) => g.name === e.target.value));
              }}
              className="input input-bordered"
            >
              <option value="">Select Ground</option>
              {grounds.map((ground) => (
                <option key={ground.name} value={ground.name}>
                  {ground.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              placeholder="Your Name"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered"
              placeholder="Your Phone"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              placeholder="Your Email"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea textarea-bordered"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            className="btn btn-primary mt-4 w-full"
            onClick={onSubmit}
          >
            Book Now
          </button>
        </form>
      </div>
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => {
            setShow(false);
          }}
        >
          <div className="bg-white p-4 rounded-lg"></div>
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg  w-1/3 max-lg:w-2/3"
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-1">
            <p>
              <span className="font-semibold">Date:</span> {date}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {time}
            </p>
            <p>
              <span className="font-semibold">Ground:</span> {ground}
            </p>
            <p>
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Message:</span> {message}
            </p>
          </div>
          <p className="text-center mt-4">
            You'll receive a confirmation email shortly.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CTA;
