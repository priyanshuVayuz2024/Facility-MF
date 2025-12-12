import { LocalizationProvider } from "@mui/x-date-pickers";
import { Outlet } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const FacilityLayout = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Outlet />
      </LocalizationProvider>
    </>
  );
};

export default FacilityLayout;
