import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainScreen from './Admin/Pages/homeDashboard';
import AddGround from "./Admin/Pages/addGround";
import AddBooking from "./Admin/Pages/addBooking";
import Approval from "./Admin/Pages/approval";
import Payments from "./Admin/Pages/payments";
import Login from "./Admin/Pages/login";

import Main from "./home/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      <Route path="/">
        <Route path="admin">
          <Route path="" element={<MainScreen />} />
          <Route path="add-ground" element={<AddGround />} />
          <Route path="add-booking" element={<AddBooking />} />
          <Route path="approval" element={<Approval />} />
          <Route path="payments" element={<Payments />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
      </Routes>
    </Router>
  );
}

export default App;