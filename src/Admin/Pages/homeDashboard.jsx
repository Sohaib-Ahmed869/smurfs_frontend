import { useState, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import ThemeControl from "../../components/ThemeControl";
import SmurfsLoader from "../../components/smurfsLoader";
import AdminSiderbar from "../Components/siderbar";
import logo from "../../assets/logobg.jpeg";
import { BiFootball } from "react-icons/bi";
import { SiCrowdin } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import AdminServices from "../../Services/AdminServices";

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
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentGrounds, setCurrentGrounds] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const [numberOfGrounds, setNumberOfGrounds] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [biggestGround, setBiggestGround] = useState("");

  const [Reminders, setReminders] = useState([]);

  useEffect(() => {
    AdminServices.getBookings().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setReminders(response.data.bookings);
        //only keep the reminders that are unapproved
        let today = new Date().toLocaleDateString();
        let filteredReminders = response.data.bookings.filter(
          (booking) => booking.status === "Unapproved" 
        );
        setReminders(filteredReminders);

        setTotalBookings(response.data.bookings.length);
        //average price
        let sum = 0;
        response.data.bookings.forEach((booking) => {
          sum += booking.price;
        });
        if(response.data.bookings.length === 0){
          setAveragePrice(0);
        }
        else 
        {
        setAveragePrice((sum / response.data.bookings.length).toFixed(2));
        }
        //get the ground with the most bookings

        let grounds = response.data.bookings.map((booking) => booking.ground);
        let counts = {};
        let compare = 0;
        let mostFrequent;
        for (let i = 0, len = grounds.length; i < len; i++) {
          let word = grounds[i];

          if (counts[word] === undefined) {
            counts[word] = 1;
          } else {
            counts[word] = counts[word] + 1;
          }
          if (counts[word] > compare) {
            compare = counts[word];
            mostFrequent = grounds[i];
          }
        }
        setBiggestGround(mostFrequent);
      }
    });
  }, []);

  useEffect(() => {
    AdminServices.getGrounds().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setGrounds(response.data.grounds);
        setTotalPages(Math.ceil(response.data.grounds.length / itemsPerPage));
        setCurrentGrounds(
          response.data.grounds.slice(indexOfFirstItem, indexOfLastItem)
        );
        setNumberOfGrounds(response.data.grounds.length);
      }
    });
  }, []);

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
          <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
            {card({
              icon: BiFootball,
              number: numberOfGrounds,
              title: "Grounds",
            })}
            {card({
              icon: SiCrowdin,
              number: totalBookings,
              title: "Total Bookings",
            })}
            {card({
              icon: FaRegCalendarAlt,
              number: averagePrice,
              title: "Average Price",
            })}
            {card({
              icon: AiOutlineDollar,
              number: biggestGround,
              title: "Most Booked Ground",
            })}
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center gap-10 p-10 lg:max-h-80 max-sm:flex-col">
        <div className="w-1/3 h-96 p-4 rounded-lg max-sm:w-full">
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
                    {reminder.startTime} - {reminder.endTime}{" "}
                    {new Date(reminder.date).toLocaleDateString()}
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
        <div className="w-2/3 max-sm:hidden">
          <table className="table-auto overflow-y-auto mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Slot Timings</th>
                <th className="px-4 py-2">Weekend </th>
                <th className="px-4 py-2">Weekend (after Midnight)</th>
                <th className="px-4 py-2">Weekday (light)</th>
                <th className="px-4 py-2">Weekday (without light)</th>
              </tr>
            </thead>
            <tbody>
              {currentGrounds.map((ground, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{ground.name}</td>
                  <td className="border px-4 py-2">{ground.location}</td>
                  <td className="border px-4 py-2">{ground.slotTimings}</td>
                  <td className="border px-4 py-2">{ground.weekend_rate}</td>
                  <td className="border px-4 py-2">
                    {ground.weekend_after_midnight}
                  </td>
                  <td className="border px-4 py-2">
                    {ground.weekday_with_light}
                  </td>
                  <td className="border px-4 py-2">
                    {ground.weekday_without_light}
                  </td>
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
