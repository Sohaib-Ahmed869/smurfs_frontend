import React, { useState, useEffect } from "react";
import ThemeControl from "../../components/ThemeControl";
import AdminSiderbar from "../Components/siderbar";
import easypaisa from "../../assets/easypaisa.png";
import jazzcash from "../../assets/jazzcash.png";

const payments = [
  {
    name: "John Doe",
    amount: 500,
    date: "2024-08-23",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "Easypaisa",
  },
  {
    name: "John Doe",
    amount: 500,
    date: "2024-09-23",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "Easypaisa",
  },
  {
    name: "John Doe",
    amount: 500,
    date: "2024-08-23",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "JazzCash",
  },
  {
    name: "John Doe",
    amount: 500,
    date: "2024-09-23",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "JazzCash",
  },
  {
    name: "John Doe",
    amount: 500,
    date: "2024-09-27",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "JazzCash",
  },
  {
    name: "John Doe",
    amount: 500,
    date: "2024-09-28",
    status: "Paid",
    booking_id: "1234",
    ground: "Askari 4",
    time: "10:00 AM - 12:00 PM",
    payment_mode: "JazzCash",
  },
];

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

const Payments = () => {
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [filteredPayments, setFilteredPayments] = React.useState(payments);

  const [total, setTotal] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalEasypaisa, setTotalEasypaisa] = useState(0);
  const [totalJazzCash, setTotalJazzCash] = useState(0);

  const [betterOption, setBetterOption] = useState("");

  const [selectedGround, setSelectedGround] = useState("");

  useEffect(() => {
    let totalAmount = 0;
    let totalPaidAmount = 0;
    let totalUnpaidAmount = 0;
    let totalEasypaisaAmount = 0;
    let totalJazzCashAmount = 0;

    payments.forEach((payment) => {
      totalAmount += payment.amount;
      if (payment.status === "Paid") {
        totalPaidAmount += payment.amount;
      } else {
        totalUnpaidAmount += payment.amount;
      }
    });

    payments.forEach((payment) => {
      if (payment.payment_mode === "Easypaisa") {
        totalEasypaisaAmount += payment.amount;
      }
      if (payment.payment_mode === "JazzCash") {
        totalJazzCashAmount += payment.amount;
      }
    });

    setTotal(totalAmount);
    setTotalPaid(totalPaidAmount);
    setTotalUnpaid(totalUnpaidAmount);
    setTotalEasypaisa(totalEasypaisaAmount);
    setTotalJazzCash(totalJazzCashAmount);

    if (totalEasypaisa > totalJazzCash) {
      setBetterOption("Easypaisa");
    } else {
      setBetterOption("JazzCash");
    }
  }, []);

  useEffect(() => {
    let filtered = [];
    console.log(dateStart, dateEnd);
    if (dateStart === "" && dateEnd === "") {
      setFilteredPayments(payments);
    } else if (dateStart === "" || dateEnd === "") {
    } else {
      filtered = payments.filter((payment) => {
        const paymentDate = new Date(payment.date);
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        console.log(paymentDate, startDate, endDate);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
      setFilteredPayments(filtered);
    }

  
  }, [dateStart, dateEnd]);

  useEffect(() => {
    let filtered = [];
    if (selectedGround === "") {
      setFilteredPayments(payments);
      return;
    } else {
      console.log(selectedGround);
      console.log(filteredPayments);
      filtered = filteredPayments.filter(
        (payment) => payment.ground === selectedGround
      );
      console.log(filtered);
      setFilteredPayments(filtered);
    }
  }, [selectedGround]);


  const onSetTodayStartAndEnd = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    setDateStart(todayString);
    setDateEnd(todayString);
  };

  return (
    <div>
      <div className="flex">
        <AdminSiderbar />
        <div className="w-full p-20">
          <ThemeControl />
          <h1 className="text-4xl mt-4 mb-4 main-heading">Payments</h1>

          <div className="grid grid-cols-3 mt-10 mb-10 gap-10">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Rs. {total}</h1>
              <h1 className="text-md font-bold">Total Amount</h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Rs. {totalPaid}</h1>
              <h1 className="text-md font-bold">Total Paid</h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Rs. {totalUnpaid}</h1>
              <h1 className="text-md font-bold">Total Unpaid</h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Rs. {totalEasypaisa}</h1>
              <h1 className="text-md font-bold">Total Easypaisa</h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Rs. {totalJazzCash}</h1>
              <h1 className="text-md font-bold">Total JazzCash</h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">{betterOption}</h1>
              <h1 className="text-md font-bold">Better Option</h1>
            </div>
          </div>

          <select
            className="input input-bordered w-1/2"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedGround(e.target.value)}}
          >
            <option value="">Select Ground</option>
            {grounds.map((ground) => (
              <option value={ground.name}>{ground.name}</option>
            ))}
          </select>
          <div className="flex justify-between mt-5 mb-1 gap-10">
            <div className="w-1/2">
              <p className="text-md text-gray-500">Select Date Range</p>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Start Date"
              />
            </div>
            <div className="w-1/2">
              <p className="text-md text-gray-500">Select Date Range</p>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="input input-bordered w-full"
                placeholder="End Date"
              />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <button
              className="cursor-pointer underline dark:text-blue-500"
              onClick={onSetTodayStartAndEnd}
            >
              Today
            </button>
            <button
              className="cursor-pointer underline text-blue-500"
              onClick={() => {
                setDateStart("");
                setDateEnd("");
              }}
            >
              Clear
            </button>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 mt-5">
            {filteredPayments.length === 0 ? (
              <div className="text-center w-full">
                <h1 className="text-2xl font-bold">No Payments Found</h1>
              </div>
            ) : null}

            {filteredPayments.map((payment) => (
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <div className="mb-2">
                    {payment.payment_mode === "Easypaisa" ? (
                      <img src={easypaisa} alt="easypaisa" className="h-10" />
                    ) : (
                      <img src={jazzcash} alt="jazzcash" className="h-10" />
                    )}
                  </div>
                  <h1 className="text-xl font-bold">{payment.name}</h1>

                  <p className="text-md text-gray-500">{payment.ground}</p>
                  <p className="text-md text-gray-500">
                    Booking ID: {payment.booking_id}
                  </p>
                </div>
                <div>
                  <p className="text-md text-gray-500">{payment.date}</p>
                  <p className="text-md text-gray-500">{payment.time}</p>
                  <h1 className="text-xl font-bold">Rs. {payment.amount}</h1>
                  <p className="text-md text-gray-500">{payment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
