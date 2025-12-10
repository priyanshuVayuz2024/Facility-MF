import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import FilterBar from "../../components/ui/FilterBar";

const filterChargeable = [
  { label: "All", value: "all" },
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "Expired", value: "expired" },
];
const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Rejected", value: "rejected" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending", value: "Pending" },
  { label: "Canceled", value: "canceled" },
];
const formatDateRangeLabel = (range) => {
  const map = {
    last_7_days: "Last 7 Days",
    current_month: "Current Month",
    last_month: "Last Month",
    custom: "Custom Range",
  };
  return map[range] || "All";
};

function BookingFilter() {
  const [expanded, setExpanded] = useState(true);
  const [bookingGlobalFilterState, setBookingGlobalFilterState] = useState({
    status: statusOptions?.map((opt) => opt.value),
    date_range: "",
    chargeable: filterChargeable?.map((opt) => opt.value),
    communitySelection: [],
  });

  const handleBookingGlobalFilterChange = (key, newValue) => {
    setBookingGlobalFilterState((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "";

  const getUpdatedFiltersBarData = (bookingGlobalFilterState) => {
    const {
      communitySelection = [],
      chargeable,
      status,
      start_date,
      end_date,
      date_range = "current_month",
    } = bookingGlobalFilterState;
    // console.log(status);
    const communityNames = communitySelection.map((c) => c.name);
    const visibleCommunities =
      communityNames.length === 0 ||
      communityNames?.length == Object.entries(communityBlockMap)?.length
        ? "All"
        : communityNames.slice(0, 2).join(", ") +
          (communityNames.length > 2 ? "..." : "");

    const updatedFilters = {
      "Community/ Block/ Unit": visibleCommunities || "All",
      Chargeable:
        !chargeable.length || chargeable.includes("all")
          ? "All"
          : chargeable?.[0],
      "Select Status":
        !status.length || status.includes("all")
          ? "All"
          : status.map((str) => capitalize(str)).join(", "),
      "Select Date Range":
        start_date && end_date && date_range == "custom"
          ? `${formatDate(start_date)} - ${formatDate(end_date)}`
          : formatDateRangeLabel(date_range),
    };

    return updatedFilters;
  };

  return (
    <div className="mt-6">
      <Accordion
        elevation={0}
        className="border-[0.5px] border-[#EBEBEB] rounded"
        defaultExpanded
        onChange={() => setExpanded((prev) => !prev)}
      >
        <AccordionSummary
          className="bg-[#FAF9FC]! filter-list-notice-board"
          expandIcon={
            <Button
              className="p-2! font-medium! text-[#884EA7]!"
              endIcon={
                expanded ? (
                  <LuChevronUp className="ms-3 filter-up-arrow" />
                ) : (
                  <LuChevronDown className="ms-3 filter-down-arrow" />
                )
              }
            >
              More Filters
            </Button>
            // <div className="flex items-center gap-5">
            //   <p className="font-medium text-[#884EA7]">More Filters</p>
            // </div>
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              margin: "16px 0",
            },
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "none", // 🚫 removes rotation
            },
          }}
        >
          <h4 className="font-semibold text-[#4D4D4F]">Filters</h4>
        </AccordionSummary>
        {/* <hr className="text-gray-300" /> */}
        <AccordionDetails className="p-4!">
          <FilterBar
            filters={getUpdatedFiltersBarData(bookingGlobalFilterState)}
            // values={filterValues}
            // onChange={(updated) => {
            //   setFilterValues(updated);
            // }}
            // globalFilterState={globalFilterState}
            // setGlobalFilterState={setGlobalFilterState}
            handleGlobalFilterChange={handleBookingGlobalFilterChange}
            // selectorOptions={selectorOptions}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BookingFilter;
