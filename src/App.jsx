import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateLayout from "./pages/createFacility/createLayout";
import BasicDetails from "./pages/createFacility/BasicDetails";
import TimeAvailability from "./pages/createFacility/TimeAvailability";
import BookingRules from "./pages/createFacility/BookingRules";
import FacilityListing from "./pages/listing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/facility" element={<FacilityListing />} />
        <Route path="/create-facility" element={<CreateLayout />}>
          <Route index element={<BasicDetails />} />
          <Route path="basic-details" element={<BasicDetails />} />
          <Route path="time-availability" element={<TimeAvailability />} />
          <Route path="booking-rules" element={<BookingRules />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
