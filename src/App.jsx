import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateLayout from "./pages/createFacility/createLayout";
import BasicDetails from "./pages/createFacility/BasicDetails";
import TimeAvailability from "./pages/createFacility/TimeAvailability";
import BookingRules from "./pages/createFacility/BookingRules";
import FacilityListing from "./pages/listing/FacilityListing";
import FacilityLayout from "./components/ui/FacilityLayout";
import BookingListing from "./pages/listing/BookingListing";
import { Provider } from "react-redux";
import FacilityPreview from "./pages/createFacility/PreviewFacility";

function App() {
  const store = window.sharedStore;

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route element={<FacilityLayout />}>
            <Route path="/facilities" element={<FacilityListing />} />
            <Route path="/active_bookings" element={<BookingListing />} />
            <Route path="/upcoming_bookings" element={<BookingListing />} />
            <Route path="/rejected_bookings" element={<BookingListing />} />
            <Route path="/pending_bookings" element={<BookingListing />} />

            <Route path="/create-facility" element={<CreateLayout />}>
              <Route index element={<BasicDetails />} />
              <Route path="basic-details" element={<BasicDetails />} />
              <Route path="time-availability" element={<TimeAvailability />} />
              <Route path="booking-rules" element={<BookingRules />} />
              <Route path="preview-facility" element={<FacilityPreview />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;