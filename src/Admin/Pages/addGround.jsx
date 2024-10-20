import React from "react";
import ThemeControl from "../../components/ThemeControl";
import AdminSiderbar from "../Components/siderbar";
import AdminServices from "../../Services/AdminServices";
import { PlusIcon } from "@heroicons/react/20/solid";

const AddGround = () => {
  const [ground, setGround] = React.useState({
    name: "",
    location: "",
    sizeWidth: "",
    sizeLength: "",
    startTime: "",
    endTime: "",
    weekend_rate: 0,
    reserved_timings_start: "",
    reserved_timings_end: "",
    weekday_with_light: 0,
    weekday_without_light: 0,
    weekend_after_midnight: 0,
    reserved_timings: "",
  });

  const onClickSubmit = () => {
    AdminServices.addGround(ground).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.data);
        alert("Ground added successfully");

        //clear the form
        setGround({
          name: "",
          location: "",
          sizeWidth: "",
          sizeLength: "",
          startTime: "",
          endTime: "",
          weekend_rate: 0,
          reserved_timings_start: "",
          reserved_timings_end: "",
          weekday_with_light: 0,
          weekday_without_light: 0,
          weekend_after_midnight: 0,
          reserved_timings: "",
        });
      }
    });
  };

  return (
    <div className="p-20 max-sm:p-5 bg-gray-100 min-h-screen">
      <AdminSiderbar />
      <div className="flex items-center gap-2">
        <PlusIcon className="h-6 w-6 text-secondary rounded-full border-2 border-black" />
        <h1 className="text-2xl text-secondary">Add Ground</h1>
      </div>
      <div>
        <p className="text-gray-600">
          Fill in the details below to add a new ground
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-gray-600">Ground Name</label>
          <input
            type="text"
            placeholder="Enter ground name"
            className="input input-bordered w-full"
            onChange={(e) => setGround({ ...ground, name: e.target.value })}
            value={ground.name}
          />
        </div>
        <div>
          <label className="text-gray-600">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full"
            onChange={(e) => setGround({ ...ground, location: e.target.value })}
            value={ground.location}
          />
        </div>
        <div>
          <label className="text-gray-600">Size Width</label>
          <input
            type="number"
            placeholder="Enter size width"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, sizeWidth: e.target.value })
            }
            value={ground.sizeWidth}
          />
        </div>
        <div>
          <label className="text-gray-600">Size Length</label>
          <input
            type="number"
            placeholder="Enter size length"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, sizeLength: e.target.value })
            }
            value={ground.sizeLength}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-gray-600">Start Time</label>
            <input
              type="time"
              placeholder="Enter start time"
              className="input input-bordered w-full"
              onChange={(e) =>
                setGround({ ...ground, startTime: e.target.value })
              }
              value={ground.startTime}
            />
          </div>
          <div className="w-1/2">
            <label className="text-gray-600">End Time</label>
            <input
              type="time"
              placeholder="Enter end time"
              className="input input-bordered w-full"
              onChange={(e) =>
                setGround({ ...ground, endTime: e.target.value })
              }
              value={ground.endTime}
            />
          </div>
        </div>
        <div>
          <label className="text-gray-600">Weekend Rate</label>
          <input
            type="number"
            placeholder="Enter weekend rate"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, weekend_rate: e.target.value })
            }
            value={ground.weekend_rate}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-gray-600">Reserved Timings Start</label>
            <input
              type="time"
              placeholder="Enter reserved timings start"
              className="input input-bordered w-full"
              onChange={(e) =>
                setGround({ ...ground, reserved_timings_start: e.target.value })
              }
              value={ground.reserved_timings_start}
            />
          </div>
          <div className="w-1/2">
            <label className="text-gray-600">Reserved Timings End</label>
            <input
              type="time"
              placeholder="Enter reserved timings end"
              className="input input-bordered w-full"
              onChange={(e) =>
                setGround({ ...ground, reserved_timings_end: e.target.value })
              }
              value={ground.reserved_timings_end}
            />
          </div>
        </div>
        <div>
          <label className="text-gray-600">Weekday with Light</label>
          <input
            type="number"
            placeholder="Enter weekday with light"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, weekday_with_light: e.target.value })
            }
            value={ground.weekday_with_light}
          />
        </div>
        <div>
          <label className="text-gray-600">Weekday without Light</label>
          <input
            type="number"
            placeholder="Enter weekday without light"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, weekday_without_light: e.target.value })
            }
            value={ground.weekday_without_light}
          />
        </div>
        <div>
          <label className="text-gray-600">Weekend After Midnight</label>
          <input
            type="number"
            placeholder="Enter weekend after midnight"
            className="input input-bordered w-full"
            onChange={(e) =>
              setGround({ ...ground, weekend_after_midnight: e.target.value })
            }
            value={ground.weekend_after_midnight}
          />
        </div>
        <button className="btn btn-primary mt-6" onClick={onClickSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddGround;
