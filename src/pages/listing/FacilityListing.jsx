import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { Link, useLocation } from "react-router-dom";
import { basePath, getPageTitle } from "../../utils";
import { Box, Button, Checkbox, Chip } from "@mui/material";
import {
  LuCheck,
  LuScanEye,
  LuSquare,
  LuSquareMinus,
  LuSquarePen,
  LuSquarePlus,
  LuX,
} from "react-icons/lu";
import MicrofrontendLoader from "../../MFloader/MicroFrontendLoader";
import { facilities, headers } from "../../components/dummyData";
import Status from "../../components/ui/StatusColor";

function FacilityListing() {
  const location = useLocation();
  const pathname = location.pathname;
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
    // {
    //   text: "View",
    //   // onClick: () => navigate(`${basePath}/view_notice/${id}`),
    //   className: "!text-[#373BB5]",
    //   icon: <LuScanEye className="!text-[#373BB5]" color="#373BB5" />,
    //   // disabled: loadingApprovingNotice || loadingRejectingNotice,
    // },
    // {
    //   text: "Edit",
    //   // onClick: () => navigate(`${basePath}/edit_notice/${id}`),
    //   className: "!text-[#C4750D]",
    //   icon: <LuSquarePen color="#C4750D" />,
    //   // disabled: loadingApprovingNotice || loadingRejectingNotice,
    // },
    // {
    //   text: "Approve",
    //   className: "!text-[#36AB6C]",
    //   icon: <LuCheck color="#36AB6C" />,
    //   // onClick: () => handleApproveNotice(selectedIds?.[0]),
    //   // disabled: loadingApprovingNotice || loadingRejectingNotice,
    // },
    // {
    //   text: "Reject",
    //   className: "!text-[#AB0000]",
    //   icon: <LuX color="#AB0000" />,
    //   // onClick: () => handleRejectNoticeModal(selectedIds?.[0]),
    //   // disabled: loadingApprovingNotice || loadingRejectingNotice,
    // },
    // {
    //   text: "Select",
    //   // onClick: () => setSelectedIds([...listings]),
    //   className: "!text-[#4D4D4F]",
    //   icon: <LuSquare className="-mr-[2.5px]" size={22} color="#121212" />,
    //   //     disabled:
    //   //       loadingApprovingNotice ||
    //   //       loadingRejectingNotice ||
    //   //       loadingPermissions,
    // },

    if (selectedIds?.length > 0) {
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
          checked={selectedIds?.some(
            (selectedId) => selectedId?.id == data?.id
          )}
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

  return (
    <>
      <MetaTitle title={"Facility Listing"} />
      <BreadCrumbCustom
        count={"8"}
        pageTitle={"Facilities"}
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
      <Header />
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
    </>
  );
}

export default FacilityListing;
