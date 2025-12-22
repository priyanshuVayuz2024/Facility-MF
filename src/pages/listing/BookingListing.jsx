import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { Link, useLocation } from "react-router-dom";
import { basePath, getPageTitle } from "../../utils";
import { Box, Button, Checkbox, Chip } from "@mui/material";
import cancelBookingAnimation from "../../assets/animations/cancelBookings.json";
import {
  LuBan,
  LuCheck,
  LuScanEye,
  LuSquare,
  LuSquareMinus,
  LuSquarePen,
  LuSquarePlus,
  LuX,
} from "react-icons/lu";
import MicrofrontendLoader from "../../MFloader/MicroFrontendLoader";
import {
  bookingHeaders,
  bookings,
  facilities,
  headers,
} from "../../components/dummyData";
import Status from "../../components/ui/StatusColor";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import BookingFilter from "./BookingFilter";

function BookingListing() {
  const location = useLocation();
  const pathname = location.pathname;
  const tableRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [cancelBookingDialog, setCancelBookingDialog] = useState(false);

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

    //   {
    //     text: "Edit",
    //     // onClick: () => navigate(`${basePath}/edit_notice/${id}`),
    //     className: "!text-[#C4750D]",
    //     icon: <LuSquarePen color="#C4750D" />,
    //     // disabled: loadingApprovingNotice || loadingRejectingNotice,
    //   },

    if (selectedIds.length > 0) {
      temp.push({
        text: "Cancel",
        className: "!text-[#AB0000]",
        icon: <LuBan color="#AB0000" />,
        onClick: () => handleCancelBooking(),
      });
      temp.push(
        {
          text: "View",
          // onClick: () => navigate(`${basePath}/view_notice/${id}`),
          className: "!text-[#373BB5]",
          icon: <LuScanEye className="text-[#373BB5]!" color="#373BB5" />,
          // disabled: loadingApprovingNotice || loadingRejectingNotice,
        },
        {
          text: "Approve",
          className: "!text-[#36AB6C]",
          icon: <LuCheck color="#36AB6C" />,
          // onClick: () => handleApproveNotice(selectedIds?.[0]),
          // disabled: loadingApprovingNotice || loadingRejectingNotice,
        },
        {
          text: "Reject",
          className: "!text-[#AB0000]",
          icon: <LuX color="#AB0000" />,
          // onClick: () =>
          //   navigate(`${basePath}/reject-notice/${data?.title?.id}`),
        }
      );
    }

    if (selectedIds?.length > 0) {
      return temp;
    } else {
      return [
        {
          text: "Select",
          onClick: () => setSelectedIds([...bookings]),
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

  const ROUTE_TO_FROM_KEY = {
    "/active_bookings": "active",
    "/upcoming_bookings": "upcoming",
    "/rejected_bookings": "rejected",
    "/pending_bookings": "pending",
  };

  const tableData = bookings?.map((data) => ({
    checkbox: {
      content: (
        <Checkbox
          className="text-[#121212]!"
          disabled={false}
          checked={selectedIds?.some(
            (selectedId) => selectedId?.id == data?.id
          )}
          onChange={(e) => handleCheckboxChange(data, e.target.checked)}
        />
      ),
      id: data.id,
    },

    // Facility Name (Maps to 'facilityName')
    facilityName: {
      text: data.facilityName,
      link: `/booking/${data.id}?from=${ROUTE_TO_FROM_KEY[location.pathname]}`,
      outerStyle: "min-w-[180px] max-w-[200px] !whitespace-normal",
      innerStyle: "line-clamp-2 text-left font-medium text-[#884EA7]",
    },

    // Community (Maps to 'community')
    community: {
      text: data.community,
    },
    unit: {
      text: data?.unit,
    },
    status: {
      content: <Status label={data.status} />,
    },
    // Start Date (New column from image)
    startDate: {
      text: data.startDate,
      outerStyle: "min-w-[120px]",
    },

    // End Date (New column from image)
    endDate: {
      text: data.endDate,
      outerStyle: "min-w-[120px]",
    },

    // Time Slot (New column from image)
    timeSlot: {
      text: data.timeSlot,
      outerStyle: "min-w-[130px]",
    },

    // Status (Maps to 'status')

    // Chargeable (Maps to 'chargeable')
    chargeable: {
      text: data.chargeable,
    },

    // Amount Charged (New column from image, using 'amountCharged')
    amountCharged: {
      text: data.amountCharged,
      outerStyle: "font-medium",
    },
    usageInstruction: {
      text: data?.usageInstruction,
    },
    // Booking For (Maps to 'bookingFor')
    bookingFor: {
      text: data.bookingFor,
    },

    // Booked By (Maps to 'bookedBy')
    bookedBy: {
      text: data.bookedBy,
    },

    extraData: {
      selectedId: null,
      isDisabled: false,
      id: data.id,
    },
  }));

  const staticProps = useMemo(
    () => ({
      //   navigate,
      //   searchParams,
      //   setSearchParams,
      headers: bookingHeaders,
      tableData,
      //   loading,
      //   loadingExportNotice,
      totalLength: "50",
      //   tileCardData: cardData,
      enableGlobalSearch: true,
      actionMenu: getActionMenu,
      //   genericActionMenu: getGenericCardActionMenu,
      exportButton: "Export Notices",
      searchPlaceholder: "Search across Facilities",
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

  const handleCancelBooking = () => {
    setCancelBookingDialog(true);
  };

  return (
    <>
      <MetaTitle title={"Booking Listing"} />
      <BreadCrumbCustom
        links={[
          (pathname.includes("active_bookings") ||
            pathname.includes("upcoming_bookings") ||
            pathname.includes("rejected_bookings") ||
            pathname.includes("bookings") ||
            pathname.includes("pending_bookings")) && {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
        ]}
        count={"8"}
        pageTitle={getPageTitle(pathname)}
        buttons={
          <Box className="w-full sm:w-fit! flex flex-col sm:flex-row items-center gap-4">
            <Button
              className="w-full sm:w-fit! px-6! py-3! min-w-[182px]! h-10 font-medium text-sm leading-4!"
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
      {/* <Header /> */}
      <BookingFilter />
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
      <ConfirmDialog
        open={cancelBookingDialog}
        onClose={() => setCancelBookingDialog(false)}
        onConfirm={() => handleCancelBooking()}
        // loading={loadingRejectingNotice}
        title="Cancel All Booking"
        description="Once cancelled, this booking cannot be restored. You will need to create a new booking if you wish to proceed again."
        confirmText="Yes, Cancel All"
        cancelText="No, Keep It"
        color="error"
        // icon={
        //   <img src="https://d18aratlqkym29.cloudfront.net/assets/warning.svg" />
        // }
        animation={cancelBookingAnimation}
      />
    </>
  );
}

export default BookingListing;
