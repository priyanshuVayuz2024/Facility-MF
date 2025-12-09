import React from "react";
import Header from "./Header";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { Link, useLocation } from "react-router-dom";
import { basePath, getPageTitle } from "../../utils";
import { Box, Button } from "@mui/material";
import { LuSquarePlus } from "react-icons/lu";

function FacilityListing() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      <MetaTitle title={"Facility Listing"} />
      <BreadCrumbCustom
        links={[
          (pathname.includes("active_bookings") ||
            pathname.includes("upcoming_bookings") ||
            pathname.includes("rejected_bookings") ||
            pathname.includes("pending_bookings")) && {
            label: "Facility",
            to: `${basePath}/`,
          },
        ]}
        count={
          pathname.includes("active_bookings") ||
          pathname.includes("upcoming_bookings") ||
          pathname.includes("rejected_bookings") ||
          pathname.includes("pending_bookings")
            ? "8"
            : null
        }
        pageTitle={getPageTitle(pathname)}
        buttons={
          <Box className="w-full sm:!w-fit flex flex-col sm:flex-row items-center gap-4">
            <Button
              className="w-full sm:!w-fit !px-6 !py-3 !min-w-[182px] h-10 font-medium text-sm !leading-4"
              sx={{ textTransform: "none" }}
              LinkComponent={Link}
              to={`${basePath}/create-facility/basic-details`}
              variant="contained"
              startIcon={<LuSquarePlus className="mr-[7px]" size={20} />}
            >
              Add New Facility
            </Button>
          </Box>
        }
      />
      <Header />
    </>
  );
}

export default FacilityListing;
