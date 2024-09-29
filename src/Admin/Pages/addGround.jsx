import React from "react";
import ThemeControl from "../../components/ThemeControl";
import AdminSiderbar from "../Components/siderbar";

const grounds = [
  {
    name: "Smurfs Stadium",
    location: "Smurfs Village",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
  },
  {
    name: "Smurfs Stadium",
    location: "Smurfs Village",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
  },
  {
    name: "Smurfs Stadium",
    location: "Smurfs Village",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
  },
  {
    name: "Smurfs Stadium",
    location: "Smurfs Village",
    capacity: 50000,
    averageRate: 500,
    sizeWidth: 100,
    sizeLength: 100,
  },
];

// {
//   name: "Rad Arena Askari 10",
//   location: "Askari 10",
//   capacity: 50000,
//   averageRate: 500,
//   sizeWidth: 100,
//   sizeLength: 100,
//   slotTimings: "90",
//   weekend_rate: 3000,
//   reserved_timings: "07:00 AM - 03:00 PM",
//   weekday_with_light: 3000,
//   weekday_without_light: 3000,
//   weekend_after_midnight: 3000,
// },
const AddGround = () => {
  const [ground, setGround] = React.useState({
    name: "",
    location: "",
    sizeWidth: "",
    sizeLength: "",
    slotTimings: "",
    weekend_rate: 0,
    reserved_timings: "",
    weekday_with_light: 0,
    weekday_without_light: 0,
    weekend_after_midnight: 0,
  });

  return (
    <div className="p-20 max-sm:p-5">
      <ThemeControl />
      <AdminSiderbar />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">Add Ground</h1>
        </div>
        <div>
          <p className="text-gray-600">
            Fill in the details below to add a new ground
          </p>
        </div>
        <div>
          <label className="text-gray-600">Ground Name</label>
          <input
            type="text"
            placeholder="Enter ground name"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Size Width</label>
          <input
            type="number"
            placeholder="Enter size width"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Size Length</label>
          <input
            type="number"
            placeholder="Enter size length"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Slot Timings</label>
          <input
            type="text"
            placeholder="Enter slot timings"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Weekend Rate</label>
          <input
            type="number"
            placeholder="Enter weekend rate"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Reserved Timings</label>
          <input
            type="text"
            placeholder="Enter reserved timings"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Weekday with Light</label>
          <input
            type="number"
            placeholder="Enter weekday with light"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Weekday without Light</label>
          <input
            type="number"
            placeholder="Enter weekday without light"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Weekend After Midnight</label>
          <input
            type="number"
            placeholder="Enter weekend after midnight"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Ground Description</label>
          <textarea
            className="textarea textarea-bordered w-full h-28"
            placeholder="Enter ground description"
          ></textarea>
        </div>
        <div>
          <label className="text-gray-600">Ground Image</label>
          <input
            type="file"
            className=" mt-2 w-full items-center flex justify-center"
          />
        </div>
        <button className="btn btn-sm btn-primary">Save</button>
      </div>
    </div>
  );
};

export default AddGround;
