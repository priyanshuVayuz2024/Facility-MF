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
import BookingCreateLayout from "./pages/createBooking/BookingCreateLayout";
import BookingDetail from "./pages/createBooking/BookingDetail";
import BookingConfirmation from "./pages/createBooking/BookingConfirmation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BookingPreview from "./pages/createBooking/BookingPreview";

function App() {
  const store = window.sharedStore;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                <Route path="preview" element={<FacilityPreview />} />
              </Route>
              <Route path="/create-booking" element={<BookingCreateLayout />}>
                <Route index element={<BookingDetail />} />
                <Route path="details" element={<BookingDetail />} />
                <Route path="confirmation" element={<BookingConfirmation />} />
                <Route path="preview" element={<BookingPreview />} />
              </Route>

            </Route>
          </Routes>
        </Provider>
      </LocalizationProvider>

    </>
  );
}

export default App;