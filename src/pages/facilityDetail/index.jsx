import React, { useEffect, useMemo, useRef, useState } from "react";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { basePath } from "../../utils";
import {
  LuChevronDown,
  LuChevronUp,
  LuCircleCheck,
  LuEllipsisVertical,
  LuPrinter,
  LuSquare,
  LuSquareMinus,
  LuSquarePen,
  LuSquarePlus,
} from "react-icons/lu";
import { MetaTitle } from "../../components/metaTitle";
import Status from "../../components/ui/StatusColor";
import MicrofrontendLoader from "../../MFloader/MicroFrontendLoader";
import { detailPageHeaders, pricing } from "../../components/dummyData";

const FacilityDetail = () => {
  const [expanded, setExpanded] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const tableRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (data, isChecked) => {
    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        return [...prevSelectedIds, data];
      } else {
        return prevSelectedIds.filter(
          (selectedId) => selectedId.id !== data.id,
        );
      }
    });
  };
  const actionMenu = () => {
    const temp = [];

    // ✅ Reply permission (assumed to be reply_notice)

    temp.push(
      {
        text: "Print",
        onClick: () => navigate(`${basePath}/print-notice/${idToUse}`),
        className: "!text-[#329DFF]",
        icon: <LuPrinter color="#329DFF" />,
      },
      //   {
      //   text: "Reply",
      //   onClick: () => navigate(`${basePath}/reply-on-notice/${idToUse}`),
      //   className: "!text-[#329DFF]",
      //   icon: <LuReply color="#329DFF" />,
      // }
    );

    // ✅ Edit permission

    temp.push({
      text: "Edit",
      onClick: () => navigate(`${basePath}/edit_notice/${idToUse}`),
      className: "!text-[#C4750D]",
      icon: <LuSquarePen color="#C4750D" />,
    });

    // ✅ Delete permission
    // if (permissions?.delete_notice) {
    //   temp.push({
    //     text: "Delete",
    //     onClick: () => handleDeleteClick(idToUse),
    //     className: "!text-[#4D4D4F]",
    //     icon: <LuTrash2 color="#4D4D4F" />,
    //   });
    // }

    return temp;
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const InfoRow = ({ label, value }) => (
    <div className=" flex flex-col gap-2">
      <p className="font-medium text-[#4D4D4D] text-sm">{label} :</p>
      <p className=" text-[#121212] ">{value}</p>
    </div>
  );

  const DividerLine = ({ thick }) => (
    <hr
      className={`border-[#EBEBEB] ${thick ? "border-b-0" : "border-dashed"} `}
    />
  );
  return (
    <>
      <MetaTitle title="Facility Detail" />
      <BreadCrumbCustom
        pageTitle={"Facility Detail"}
        links={[
          {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
          {
            label: "Listing",
            to: `${basePath}/facilities`,
          },
        ]}
        backDisable={true}
      />
      <Card
        elevation={0}
        className="p-0! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded!"
      >
        <CardContent className="p-4! grid gap-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h1 className="w-full sm:max-w-1/2 font-bold text-3xl text-[#121212]">
              {"Activity Room"}
            </h1>
            <div className="w-full sm:max-w-1/2 flex items-center justify-end gap-10">
              <Status label={"active"} />

              <p className="text-sm text-[#4D4D4F]">
                {"17-June-2025 02:08:25 PM"}
              </p>
              {actionMenu()?.length > 0 && (
                <IconButton onClick={handleMenuOpen}>
                  <LuEllipsisVertical style={{ cursor: "pointer" }} />
                </IconButton>
              )}

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  list: { autoFocusItem: false },
                  paper: {
                    sx: {
                      ml: -2.5, // Adjust this value to shift left
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // custom shadow with 8px blur
                    },
                  },
                }}
                sx={{
                  "& .MuiList-root": {
                    padding: 0,
                  },
                }}
              >
                {actionMenu().map((action, i) => (
                  <MenuItem
                    sx={{
                      width: "140px",
                      "&:not(:last-of-type)": {
                        borderBottom: "0.5px solid #EBEBEB",
                      },
                    }}
                    className="space-x-2"
                    key={i}
                    onClick={() => {
                      action?.onClick?.();
                      handleMenuClose(); // Optionally close the menu after click
                    }}
                  >
                    {action?.icon}
                    <span
                      className={`${action.className} flex items-center gap-2`}
                    >
                      {action?.text}
                    </span>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <DividerLine />
          <Card
            elevation={0}
            className="p-4! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded! flex flex-col gap-4"
          >
            <h1 className="w-full sm:max-w-1/2 font-semibold text-lg text-[#121212]">
              Basic Details
            </h1>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 ">
              <InfoRow label="Community" value={"Greenview Height"} />
              <InfoRow label="Category" value={`Club House`} />
              <InfoRow
                label="Accessible To"
                value={
                  <span className="text-[#663A7E] font-semibold">
                    Owners + 2
                  </span>
                }
              />
              <InfoRow label="Intercom" value={`213765723`} />
            </Box>
          </Card>
          <Card
            elevation={0}
            className="p-4! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded! flex flex-col gap-4"
          >
            <h1 className="w-full sm:max-w-1/2 font-semibold text-lg text-[#121212]">
              Time & Availability
            </h1>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 ">
              <InfoRow
                label="Available On"
                value={
                  <span className="text-[#663A7E] font-semibold">
                    All Days (Monday - Sunday)
                  </span>
                }
              />
              <InfoRow label="Operating Hours" value={`05:00 AM - 10:00 PM`} />
              <InfoRow label="Availability Type" value={"Custom Duration"} />
            </Box>
          </Card>
          <Card
            elevation={0}
            className="p-4! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded! flex flex-col gap-4"
          >
            <h1 className="w-full sm:max-w-1/2 font-semibold text-lg text-[#121212]">
              Booking Rules & Settings
            </h1>
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 ">
              <InfoRow label="Approval Required" value={"Yes"} />
              <InfoRow label="Chargeable" value={`No`} />
              <InfoRow label="Booking Time Limit" value={"15 min"} />
              <InfoRow label="Advance Booking Limit" value={"3 Days"} />
            </Box>
          </Card>
          <Card
            elevation={0}
            className="p-4! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded! flex flex-col gap-2"
          >
            <h1 className="w-full sm:max-w-1/2! font-semibold! text-lg text-[#121212]">
              General Instruction
            </h1>

            <Box>
              <ol className="tracking-[.05em]">
                <li>
                  Timings: The pool is open from{" "}
                  <strong>6:00 AM to 9:00 PM</strong>. Please ensure you book
                  within these hours.
                </li>
                <li>
                  Access: Only registered residents/members are allowed to book
                  and use the facility.
                </li>
                <li>
                  Attire: Proper swimming attire is mandatory — no casual
                  clothing allowed in the pool.
                </li>
                <li>
                  Hygiene: Shower before entering the pool. Do not use the pool
                  if you have open wounds or infections.
                </li>
                <li>
                  Children: Children below 12 years must be accompanied by an
                  adult at all times.
                </li>
                <li>
                  Safety: No diving, running, or rough play near or inside the
                  pool area.
                </li>
                <li>
                  Food &amp; Drinks: Not allowed inside the pool area (only
                  water bottles permitted).
                </li>
                <li>
                  Cancellation: Please cancel your booking at least 1 hour
                  before if you’re unable to attend.
                </li>
                <li>
                  Cleanliness: Dispose of waste properly and keep the pool area
                  clean.
                </li>
                <li>
                  Penalty: Misuse or rule violations may result in temporary
                  suspension of booking privileges.
                </li>
              </ol>
            </Box>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default FacilityDetail;
