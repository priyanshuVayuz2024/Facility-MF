import React, { useEffect, useMemo, useRef, useState } from "react";
import FacilityHeader from "./FacilityHeader";
import { MetaTitle } from "../../../components/metaTitle";
import { BreadCrumbCustom } from "../../../components/ui/breadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { basePath, getPageTitle } from "../../../utils";
import { Box, Button, Checkbox, Chip } from "@mui/material";
import {
  LuBan,
  LuCheck,
  LuFullscreen,
  LuScanEye,
  LuSquare,
  LuSquareEqual,
  LuSquareMinus,
  LuSquarePen,
  LuSquarePlus,
  LuX,
} from "react-icons/lu";
import MicrofrontendLoader from "../../../MFloader/MicroFrontendLoader";
import { facilities, headers } from "../../../components/dummyData";
import Status from "../../../components/ui/StatusColor";
import { SquarePause, Trash2 } from "lucide-react";
import DeleteFacilityModal from "../../../components/ui/DeleteFacilityModal";
import FacilityFilter from "./FacilityFilter";

function FacilityListing() {
  const location = useLocation();
  const pathname = location.pathname;
  const tableRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [unselectedIds, setUnselectedIds] = useState([]);
  const [deleteFacModal, setDeleteFacModal] = useState(false);
  console.log(selectedIds, unselectedIds, isAllSelected, "selectedIds");
  const navigate = useNavigate();

  const handleDeleteModal = () => {
    setDeleteFacModal(false);
  };

  const totalFacility = 140;

  const handleCheckboxChange = (data, isChecked) => {
    console.log(data, isChecked, "ischecked");
    if (isAllSelected) {
      // When global select is ON → manage exclusions
      setUnselectedIds((prev) =>
        isChecked
          ? prev.filter((prevData) => prevData?.id !== data.id)
          : [...prev, data],
      );
    } else {
      // Normal page selection
      setSelectedIds((prev) =>
        isChecked
          ? [...prev, data]
          : prev.filter((item) => item.id !== data.id),
      );
    }
  };

  const handleSelectAllGlobal = () => {
    setIsAllSelected(true);
    setSelectedIds([]); // clear page state
    setUnselectedIds([]); // reset exclusions
  };

  const handleClearSelection = () => {
    setIsAllSelected(false);
    setSelectedIds([]);
    setUnselectedIds([]);
  };

  const renderSelectAllText = () => {
    if (selectedIds.length === 0 && !isAllSelected) return null;
    return (
      <>
        {selectedIds.length > 0 && !isAllSelected && (
          <div className="">
            {selectedIds.length} Facility on this page are selected.{" "}
            <span
              onClick={handleSelectAllGlobal}
              className="text-[#884ea7] cursor-pointer font-medium hover:underline"
            >
              Select all {totalFacility} Facilities in Facility Listing.
            </span>
          </div>
        )}
        {isAllSelected && (
          <div className=" flex gap-2">
            <span>
              All {totalFacility} facility in facilities listing are selected.
            </span>

            <span
              onClick={handleClearSelection}
              className="text-[#884ea7] cursor-pointer font-medium hover:underline"
            >
              Clear Selection
            </span>
          </div>
        )}
      </>
    );
  };

  const isRowChecked = (data) => {
    if (isAllSelected) {
      return !unselectedIds.some((item) => item.id === data.id);
    }
    return selectedIds.some((item) => item.id == data?.id);
  };

  const getActionMenu = () => {
    let temp = [
      {
        text: "De-select",
        onClick: () =>
          isAllSelected ? handleClearSelection() : setSelectedIds([]),
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

    if (selectedIds.length == 1) {
      temp.push(
        {
          text: "View",
          // onClick: () => navigate(`${basePath}/view_notice/${id}`),
          className: "!text-[#373BB5]",
          icon: <LuScanEye className="text-[#373BB5]!" color="#373BB5" />,
          // disabled: loadingApprovingNotice || loadingRejectingNotice,
        },
        {
          text: "Edit",
          className: "!text-[#c3750D]",
          icon: <LuSquarePen color="#c3750D" />,
          // onClick: () => handleApproveNotice(selectedIds?.[0]),
          // disabled: loadingApprovingNotice || loadingRejectingNotice,
        },
        {
          text: "View Booking",
          className: "!text-[#2e90e9]",
          icon: <LuFullscreen color="#2e90e9" />,
          // onClick: () =>
          //   navigate(`${basePath}/reject-notice/${data?.title?.id}`),
        },
        {
          text: "Suspend Facility",
          className: "!text-[#bd3737] ",
          icon: <SquarePause color="#bd3737" />,
          onClick: () =>
            navigate(`${basePath}/suspend-facility/${selectedIds?.[0]?.id}`),
        },
      );
    }
    if (selectedIds?.length > 0 || isAllSelected) {
      temp.push({
        text: "Delete",
        className: "!text-[#4d4d4f] ",
        icon: <Trash2 color="#4d4d4f" />,

        onClick: () => setDeleteFacModal(true),
      });
    }

    if (selectedIds?.length > 0 || isAllSelected) {
      return temp;
    } else {
      return [
        {
          text: "Select",
          onClick: () => setSelectedIds([...facilities]),
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

  const tableData = facilities?.map((data) => ({
    checkbox: {
      content: (
        <Checkbox
          className="text-[#121212]!"
          disabled={false}
          checked={isRowChecked(data)}
          onChange={(e) => handleCheckboxChange(data, e.target.checked)}
        />
      ),
      id: data.id,
    },

    facilityName: {
      text: data.name,
      link: `/facility/${data.id}`,
      outerStyle: "min-w-[260px] max-w-[260px] !whitespace-normal",
      innerStyle: "line-clamp-2 text-left font-medium text-[#884EA7]",
    },

    community: {
      text: data.community,
    },

    facilityCategory: {
      text: data.category,
    },

    status: {
      content: <Status label={"active"} />,
    },

    intercomNumber: {
      text: data.intercom,
    },

    approvalNeeded: {
      text: data.approval,
    },

    chargeable: {
      text: data.chargeable,
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
      headers,
      tableData,
      //   loading,
      //   loadingExportNotice,
      // totalLength: "50",
      //   tileCardData: cardData,
      enableGlobalSearch: true,
      actionMenu: getActionMenu,
      selectAllExisitngData: renderSelectAllText(),
      //   genericActionMenu: getGenericCardActionMenu,
      exportButton: "Export Notices",
      searchPlaceholder: "Search across Facilities",
      //   exportButtonOnClick: () =>
      //     fetchNotices({ pageToPass: page, isExport: true }),
    }),
    [tableData],
  );

  useEffect(() => {
    if (tableRef.current?.updateProps) {
      tableRef.current.updateProps(staticProps); // ✅ sending plain functions
    }
  }, [staticProps, tableData]);

  return (
    <>
      <MetaTitle title={"Facility Listing"} />
      <BreadCrumbCustom
        links={[
          (pathname.includes("active_facilities") ||
            pathname.includes("suspended_facilities")) && {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
        ]}
        count={"8"}
        pageTitle={getPageTitle(pathname)}
        buttons={
          <div className="flex justify-center gap-4">
            <Box className="w-full sm:w-fit! flex flex-col sm:flex-row items-center gap-4">
              <Button
                className="w-full sm:w-fit! px-6! py-3! min-w-[182px]! h-10 font-medium text-sm leading-4!"
                sx={{ textTransform: "none" }}
                LinkComponent={Link}
                to={`${basePath}/bookings`}
                variant="outlined"
              >
                Bookings
              </Button>
            </Box>
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
          </div>
        }
      />
      <FacilityHeader />
      <FacilityFilter />
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
      <DeleteFacilityModal open={deleteFacModal} onClose={handleDeleteModal} />
    </>
  );
}

export default FacilityListing;
