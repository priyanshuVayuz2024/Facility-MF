import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateLayout from "./pages/createFacility/createLayout";
import BasicDetails from "./pages/createFacility/BasicDetails";
import TimeAvailability from "./pages/createFacility/TimeAvailability";
import BookingRules from "./pages/createFacility/BookingRules";
import FacilityListing from "./pages/listing/FacilityListing";
import FacilityLayout from "./components/ui/FacilityLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<FacilityLayout />}>
          <Route path="/facilities" element={<FacilityListing />} />
          <Route path="/active_bookings" element={<FacilityListing />} />
          <Route path="/upcoming_bookings" element={<FacilityListing />} />
          <Route path="/rejected_bookings" element={<FacilityListing />} />
          <Route path="/pending_bookings" element={<FacilityListing />} />

          <Route path="/create-facility" element={<CreateLayout />}>
            <Route index element={<BasicDetails />} />
            <Route path="basic-details" element={<BasicDetails />} />
            <Route path="time-availability" element={<TimeAvailability />} />
            <Route path="booking-rules" element={<BookingRules />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;