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
          (selectedId) => selectedId.id !== data.id
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
      }
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

  const getActionMenu = () => {
    let temp = [
      {
        text: "De-select",
        onClick: () => setSelectedIds([]),
        className: "!text-[#4D4D4F]",
        icon: (
          <LuSquareMinus
            className="-mr-[2.5px]"
            size={24}
            color="#FFFFFF"
            fill="#121212"
          />
        ),
        // disabled: loadingApprovingNotice || loadingRejectingNotice,
      },
    ];

    if (selectedIds?.length > 0) {
      return temp;
    } else {
      return [
        {
          text: "Select",
          onClick: () => setSelectedIds([...pricing]),
          className: "!text-[#4D4D4F]",
          icon: <LuSquare className="-mr-[2.5px]" size={22} color="#121212" />,
          //     disabled:
          //       loadingApprovingNotice ||
          //       loadingRejectingNotice ||
          //       loadingPermissions,
        },
      ];
    }
  };

  const customButtons = [
    {
      label: "Set Rate",
      icon: (
        <IconButton className="p-0!">
          <img src="/icons/money-bill.svg" />
        </IconButton>
      ),
      onClick: () => alert("hi"),
      className: "bg-[#FBF5FF]! text-[#884EA7]!",
      variant: "none",
    },
  ];

  const tableData = pricing?.map((item) => ({
    checkbox: {
      content: (
        <Checkbox
          className="text-[#121212]!"
          disabled={false}
          checked={selectedIds?.some(
            (selectedId) => selectedId?.id == item?.id
          )}
          onChange={(e) => handleCheckboxChange(item, e.target.checked)}
        />
      ),
      id: item.id,
    },

    rateName: {
      text: item.name,
      outerStyle: "min-w-[260px] max-w-[260px] !whitespace-normal",
      innerStyle: "line-clamp-2 text-left font-medium text-[#121212]",
    },

    date: {
      text: item.date,
    },

    time: {
      text: item.time,
    },

    rate: {
      text: item.rate,
    },

    discountedRate: {
      text: item.discountedRate,
    },

    extraData: {
      selectedId: null,
      isDisabled: false,
      id: item.id,
    },
  }));

  const staticProps = useMemo(
    () => ({
      //   navigate,
      //   searchParams,
      //   setSearchParams,
      headers: detailPageHeaders,
      tableData,
      //   loading,
      //   loadingExportNotice,
      //   totalLength: "50",
      //   tileCardData: cardData,
      //   enableGlobalSearch: true,
      actionMenu: getActionMenu,
      customButtons: customButtons,
      //   genericActionMenu: getGenericCardActionMenu,
      //   exportButton: "Export Notices",
      //   searchPlaceholder: "Search across Facilities",
      //   exportButtonOnClick: () =>
      //     fetchNotices({ pageToPass: page, isExport: true }),
    }),
    [tableData]
  );

  useEffect(() => {
    if (tableRef.current?.updateProps) {
      tableRef.current.updateProps(staticProps); // ✅ sending plain functions
    }
  }, [staticProps, tableData]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const InfoRow = ({ label, value }) => (
    <Box className="flex justify-start gap-2 items-center">
      <span className="font-medium text-[#4D4D4D] text-sm">{label} :</span>
      <span className="text-right text-[#121212] font-medium">{value}</span>
    </Box>
  );

  const DividerLine = ({ thick }) => (
    <hr
      className={`border-[#EBEBEB] ${
        thick ? "border-b-0" : "border-dashed"
      } my-4`}
    />
  );
  return (
    <>
      <MetaTitle title="View Facility" />
      <BreadCrumbCustom
        pageTitle={"View Facility"}
        buttons={
          <Box className="w-full sm:w-fit! flex flex-col sm:flex-row items-center gap-4">
            <Button
              className="w-full sm:w-fit! px-6! py-3! min-w-[182px]! h-10 font-medium text-sm leading-4!"
              sx={{ textTransform: "none" }}
              LinkComponent={Link}
              to={`${basePath}/create-booking`}
              variant="contained"
              startIcon={<LuSquarePlus className="mr-[7px]" size={20} />}
            >
              Add New Booking
            </Button>
          </Box>
        }
        links={[
          {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
        ]}
        backDisable={false}
      />
      <Card
        elevation={0}
        className="p-0! bg-white! border-[0.5px]! border-[#EBEBEB]! rounded!"
      >
        <CardContent className="p-5! grid gap-4">
          <Box className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h1 className="w-full sm:max-w-1/2 font-semibold text-xl text-[#121212]">
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
          </Box>
          <DividerLine />
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 ">
            <InfoRow label="Category" value={"Club House 1"} />
            <InfoRow
              className="text-[#884EA7] cursor-pointer font-medium"
              label="Accessible To"
              value={
                <span
                  className="text-[#884EA7] cursor-pointer font-medium"
                  //   onClick={() => setPopupOpen(true)}
                >
                  Owners + 2
                </span>
              }
            />
            <InfoRow label="Intercom" value={"200022" || "—"} />
            <InfoRow
              label="Posted In"
              value={
                <span
                  className="text-[#884EA7] cursor-pointer font-medium"
                  //   onClick={() => setPopupOpen(true)}
                >
                  Greenview Heights
                </span>
              }
            />
            <InfoRow
              label="Availability"
              value={
                <span
                  className="text-[#884EA7] cursor-pointer font-medium"
                  //   onClick={() => setPopupOpen(true)}
                >
                  All 7 days
                </span>
              }
            />
            <InfoRow
              label="Slots Available"
              value={
                <span
                  className="text-[#884EA7] cursor-pointer font-medium"
                  //   onClick={() => setPopupOpen(true)}
                >
                  4 Slot Available
                </span>
              }
            />
            <>
              <InfoRow label="Operating Hours" value={`05:00 hrs-23:45 hrs`} />
            </>

            <InfoRow label="Approval Required" value={"Yes"} />
            <InfoRow label="Booking Quota Limit" value={`3`} />
            <InfoRow label="Booking Time Limit" value={`90 min`} />
            <InfoRow label="Advance Booking Limit" value={`90 min`} />
            <InfoRow label="Max Booking Per Slot" value={`2`} />
          </Box>
          <DividerLine />
          <Box>
            <Typography className="text-xl! font-semibold! mb-2!">
              General Instruction
            </Typography>
            <Box>
              <ol>
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
          </Box>
          <DividerLine />
          <Box>
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
                  ></Button>
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
                <h4 className="font-semibold text-[#4D4D4F]">
                  <div className="flex gap-2 justify-center items-center">
                    <IconButton className="p-0!">
                      <img src="/icons/green-check.svg" />
                    </IconButton>
                    Chargeable
                  </div>
                </h4>
              </AccordionSummary>
              <AccordionDetails className="p-4!">
                <div className="flex justify-start gap-40">
                  <InfoRow label="Charge Type Group" value={"Postpaid"} />
                  <InfoRow label="Charge Category (Invoice)" value={"Bank"} />
                  <InfoRow label="Due Date Policy" value={"4 Days"} />
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
          <DividerLine />
          <Box>
            <Typography className="text-xl! font-semibold! ">
              Booking Charges
            </Typography>
            <MicrofrontendLoader
              ref={tableRef}
              // scriptUrl={"http://localhost:5000/reusableTable-bundle.js" + `?date=${Date.now()}`}
              scriptUrl={
                `${
                  localStorage.getItem(`noticeBoardMF-tableBundle`) ||
                  "https://d18aratlqkym29.cloudfront.net/frontend-build/table/1.1/mf/reusableTable-bundle.js"
                }` + `?date=${Date.now()}`
              }
              globalVarName="reusableTable"
              mountDivId="reusableTable"
              propsToPass={staticProps}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default FacilityDetail;
