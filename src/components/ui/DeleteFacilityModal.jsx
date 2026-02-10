import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
} from "@mui/material";
import { CircleAlert } from "lucide-react";
import { LuCircleX } from "react-icons/lu";
import MicrofrontendLoader from "../../MFloader/MicroFrontendLoader";
import { useEffect, useMemo, useRef } from "react";
import { DeleteFacilityHeaders, facilities } from "../dummyData";
import Status from "./StatusColor";

const DeleteFacilityModal = ({ open, onClose }) => {
  const tableRef = useRef();

  const tableData = facilities.slice(0, 2)?.map((data) => ({
    facilityName: {
      text: data.name,
      link: `/facility/${data.id}`,
      outerStyle: "min-w-[260px] max-w-[260px] !whitespace-normal",
      innerStyle: "line-clamp-2 text-left font-medium text-[#884EA7]",
    },

    community: {
      text: data.community,
    },

    unit: {
      text: data.unit,
    },

    status: {
      content: <Status label={"active"} />,
    },

    startDate: {
      text: data.startDate,
    },

    endDate: {
      text: data.endDate,
    },

    timeSlot: {
      text: data.timeSlot,
    },

    extraData: {
      selectedId: null,
      isDisabled: false,
      id: data.id,
    },
  }));

  const staticProps = useMemo(
    () => ({
      headers: DeleteFacilityHeaders,
      tableData,
    }),
    [tableData],
  );

  useEffect(() => {
    if (tableRef.current?.updateProps) {
      tableRef.current.updateProps(staticProps); // ✅ sending plain functions
    }
  }, [staticProps, tableData]);

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          // match figma frame
          borderRadius: "12px",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          px: 3,
          py: 2,
        }}
      >
        Delete Facility
        <button onClick={onClose}>
          <LuCircleX size={22} />
        </button>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ px: 3, py: 2 }}>
        {/* Warning */}
        <div className="flex items-start gap-3 bg-[#FFF7E6] border border-[#F5E6B3] rounded-xl p-4 w-full">
          <CircleAlert size={22} className="text-[#E6A700]" />

          <div>
            <p className="font-semibold text-gray-800">
              Active Bookings Detected
            </p>
            <p className="text-sm text-gray-600">
              This facility has 3 active bookings.
            </p>
          </div>
        </div>

        {/* Section */}
        <p className="text-xl font-semibold text-gray-800 mt-8">
          Affected Bookings
        </p>

        {/* Table */}
        <div className="rounded-xl overflow-hidden">
          <div className="max-h-[300px] overflow-auto ">
            <MicrofrontendLoader
              ref={tableRef}
              scriptUrl={`${
                localStorage.getItem(`noticeBoardMF-tableBundle`) ||
                "https://d18aratlqkym29.cloudfront.net/frontend-build/table/1.1/mf/reusableTable-bundle.js"
              }?date=${Date.now()}`}
              globalVarName="reusableTable"
              mountDivId="reusableTable"
              propsToPass={staticProps}
            />
          </div>
        </div>

        {/* Refund */}
        <div className="flex items-center gap-1 mt-6 text-red-800">
          <p>Total Refund: ₹</p>
          <span>2,00,000</span>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E5E7EB", // gray-200
            color: "#111827",
            textTransform: "none",
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#D1D5DB",
              boxShadow: "none",
            },
          }}
          onClick={onClose}
        >
          No, Keep It
        </Button>

        <Button
          sx={{
            textTransform: "none",
            borderRadius: "4px",
            px: 3,
            backgroundColor: "#AB0000",
            color: "white",
          }}
          backgroundColor="bg-#AB0000"
          variant="contained"
        >
          Cancel Booking & Inactive
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFacilityModal;
