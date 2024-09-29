import { useState, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import ThemeControl from "../../components/ThemeControl";
import SmurfsLoader from "../../components/smurfsLoader";
import AdminSiderbar from '../Components/siderbar';
import logo from "../../assets/logobg.jpeg";
import { BiFootball } from "react-icons/bi";
import { SiCrowdin } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";


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
const card = (props) => {
  return (
    <div className="border-2 border-yellow-700 p-10 my-4 rounded-xl shadow-lg w-full flex justify-between items-center">
      <props.icon className="text-5xl text-yellow-700" />
      <div>
        <p className="text-right text-2xl font-bold">{props.number}</p>
        <h3 className="text-right text-md">{props.title}</h3>
      </div>
    </div>
  );
};
function MainScreen() {
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentGrounds = grounds.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(grounds.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  const [numberOfGrounds, setNumberOfGrounds] = useState(grounds.length);

  const [averageCost, setAverageCost] = useState(
    grounds.reduce((acc, item) => acc + item.averageRate, 0) / numberOfGrounds
  );

  const [totalCapacity, setTotalCapacity] = useState(
    grounds.reduce((acc, item) => acc + item.capacity, 0)
  );

  const [biggestGround, setBiggestGround] = useState("");

  useEffect(() => {
    const biggestGround = grounds.reduce((prev, current) =>
      prev.sizeWidth * prev.sizeLength > current.sizeWidth * current.sizeLength
        ? prev
        : current
    );
    setBiggestGround(biggestGround.name);
  }, [grounds]);

  return (
    <div>
      {loading && <SmurfsLoader />}
      <AdminSiderbar />

      <div className="flex items-center mt-2 w-full justify-between p-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-center text-xl font-bold">Smurfs FC</h2>
        </div>
        <ThemeControl />
      </div>
      <div className="flex items-center justify-center gap-10 p-10">
        <div className="w-full">
          <h2 className="text-left text-xl font-bold flex items-center gap-2">
            <FcStatistics className="inline-block text-yellow-300 text-3xl" />
            Statistics
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {card({
              icon: BiFootball,
              number: numberOfGrounds,
              title: "Grounds",
            })}
            {card({
              icon: SiCrowdin,
              number: averageCost,
              title: "Average Cost",
            })}
            {card({
              icon: FaRegCalendarAlt,
              number: totalCapacity,
              title: "Total Capacity",
            })}
            {card({
              icon: AiOutlineDollar,
              number: biggestGround,
              title: "Biggest Ground",
            })}
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center gap-10 p-10 max-h-80">
        <div className="w-2/4 h-96 p-4 rounded-lg">
          <h2 className="text-left text-xl font-bold flex items-center gap-2">
            <IoMdNotifications className="inline-block text-yellow-300 text-3xl" />
            Reminders
          </h2>
          <div className="grid grid-cols-1 overflow-y-auto scrollbar max-h-72">
            {Reminders.map((reminder, index) => (
              <div key={index} className="border p-4 my-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-left text-sm font-semibold flex items-center">
                    {reminder.title}
                  </h3>
                  <p className="text-left text-sm">
                    {reminder.time} {reminder.date}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-left text-sm">Ground: {reminder.ground}</p>
                  <p className="text-left text-sm">
                    Customer: {reminder.customerName}
                  </p>
                </div>
                <p className="text-left text-sm">Price: {reminder.price}/-</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/4">
          <table className="table-auto overflow-y-auto mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Average Rate</th>
                <th className="px-4 py-2">Size Width</th>
                <th className="px-4 py-2">Size Length</th>
              </tr>
            </thead>
            <tbody>
              {currentGrounds.map((ground, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{ground.name}</td>
                  <td className="border px-4 py-2">{ground.location}</td>
                  <td className="border px-4 py-2">{ground.averageRate}</td>
                  <td className="border px-4 py-2">{ground.sizeWidth}</td>
                  <td className="border px-4 py-2">{ground.sizeLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls flex items-center w-full justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-lg"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
