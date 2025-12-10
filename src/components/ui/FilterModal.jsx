import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  ListItemText,
  ListItem,
  Radio,
  List,
  FormHelperText,
  DialogActions,
  IconButton,
  InputAdornment,
  FormLabel,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import {
  LuCalendarDays,
  LuChevronRight,
  LuCircleX,
  LuDot,
  LuX,
} from "react-icons/lu";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { MainFilter } from "./selectorPopup";
// import { basePath, buildCommunityStructure } from "../../utils";
// import { context } from "../../context/context";
import { DatePicker } from "@mui/x-date-pickers";
// import { useSelector } from "react-redux";

export default function FilterModal({
  open,
  onClose,
  globalFilterState,
  setGlobalFilterState,
  handleGlobalFilterChange,
  selectorOptions,
  selectedFilterKey,
}) {
  // const { permissions } = useSelector((state) => state.meta);
  const [searchTerm, setSearchTerm] = useState("");

  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [startDateValue, setStartDateValue] = useState(null);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  // const isApplyDisabled =
  //   (globalFilterState.date_range === "custom" &&
  //     (!globalFilterState.start_date || !globalFilterState.end_date)) ||
  //   globalFilterState.visibility.length == 0 ||
  //   globalFilterState?.status?.length == 0;

  const filterData = {
    Filters: [
      { id: 0, label: "Communities, Blocks, Units", key: "community_ids" },
      { id: 1, label: "Visibility", key: "notice_access_level" },
      { id: 2, label: "Status", key: "status" },
      { id: 3, label: "Date Range", key: "date_range" },
    ],
    Communities: [
      {
        label: "Greenview Heights",
        hasChildren: true,
        children: [
          { block: "Block A", units: ["A 101", "A 102", "A 103"] },
          { block: "Block B", units: [] },
          { block: "Block C", units: ["C 101", "C 102"] },
        ],
      },
      { label: "Lakewood Residency", hasChildren: false },
      { label: "Silver Oak Meadows", hasChildren: true },
    ],
    Visibility: [
      { label: "All", value: "all" },
      { label: "Members", value: "members" },
      { label: "Residing Members", value: "residing_members" },
      { label: "Owners", value: "owners" },
      { label: "Committee Members", value: "committee_members" },
      { label: "Tenants", value: "tenants" },
    ],
    // Status: statusOptions,
    DateRange: [
      { label: "Last 7 Days", value: "last_7_days" },
      { label: "Current Month", value: "current_month" },
      { label: "Last Month", value: "last_month" },
      { label: "Custom", value: "custom" },
    ],
  };

  const [filter, setFilter] = useState(selectedFilterKey || 0);
  const location = useLocation();
  const navigate = useNavigate();
  const [clearFilter, setClearFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");

  const defaultFilterState = {
    communitySelection: [],
    date_range: "",
    start_date: "",
    end_date: "",
    status: ["all", "active", "rejected", "expired", "expiring", "pending"],
    visibility: [
      "all",
      "members",
      "residing_members",
      "owners",
      "committee_members",
      "tenants",
    ],
  };

  const isEqualArray = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val) => b.includes(val));

  console.log(searchParams.get("multi_status"));

  // const multiStatus = searchParams.get("multi_status");
  // const noticeAccessLevel = searchParams.get("notice_access_level");
  // const isFilterUnchanged =
  //   !multiStatus &&
  //   !noticeAccessLevel &&
  //   globalFilterState.communitySelection.length === 0 &&
  //   globalFilterState.date_range === defaultFilterState.date_range &&
  //   globalFilterState.start_date === defaultFilterState.start_date &&
  //   globalFilterState.end_date === defaultFilterState.end_date &&
  //   isEqualArray(globalFilterState.status, defaultFilterState.status) &&
  //   isEqualArray(globalFilterState.visibility, defaultFilterState.visibility);

  console.log(globalFilterState, "globalFilterState");

  useEffect(() => {
    if (open && selectedFilterKey != null) {
      setFilter(selectedFilterKey);
    }
  }, [open, selectedFilterKey]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "";

  // const handleApplyFilters = () => {
  //   const updatedParams = new URLSearchParams(searchParams);
  //   updatedParams.delete("page");
  //   // --- Date Range Logic ---
  //   const today = new Date();
  //   let startDate = "";
  //   let endDate = "";

  //   switch (globalFilterState.date_range) {
  //     case "last_7_days": {
  //       const past = new Date();
  //       past.setDate(today.getDate() - 7);
  //       startDate = past.toISOString().split("T")[0];
  //       endDate = today.toISOString().split("T")[0];
  //       break;
  //     }
  //     case "current_month": {
  //       const start = new Date(today.getFullYear(), today.getMonth(), 1);
  //       const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  //       startDate = start.toISOString().split("T")[0];
  //       endDate = end.toISOString().split("T")[0];
  //       break;
  //     }
  //     case "last_month": {
  //       const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  //       const end = new Date(today.getFullYear(), today.getMonth(), 0);
  //       startDate = start.toISOString().split("T")[0];
  //       endDate = end.toISOString().split("T")[0];
  //       break;
  //     }
  //     case "custom": {
  //       startDate = formatDate(globalFilterState?.start_date);
  //       endDate = formatDate(globalFilterState?.end_date);
  //       break;
  //     }
  //     default:
  //       break;
  //   }

  //   if (globalFilterState.date_range) {
  //     updatedParams.set("date_range", globalFilterState.date_range);
  //   } else {
  //     updatedParams.delete("date_range");
  //   }

  //   if (startDate) updatedParams.set("start_date", startDate);
  //   else updatedParams.delete("start_date");

  //   if (endDate) updatedParams.set("end_date", endDate);
  //   else updatedParams.delete("end_date");

  //   // First clear all possible status keys
  //   updatedParams.delete("multi_status");

  //   const statusApiMap = {
  //     active: "current",
  //     expired: "show_expired",
  //     expiring: "weakly_expired",
  //     pending: "pending_for_approval_notices",
  //     rejected: "rejected",
  //   };

  //   const selectedStatuses = globalFilterState.status || [];
  //   const apiStatusList = selectedStatuses
  //     .map((label) => statusApiMap[label])
  //     .filter(Boolean);
  //   // Get all API values from statusApiMap
  //   const allStatusApiValues = Object.values(statusApiMap);
  //   // If not all statuses are selected, set multi_status
  //   const isAllStatusesSelected =
  //     apiStatusList.length === allStatusApiValues.length;

  //   if (apiStatusList.length && !isAllStatusesSelected) {
  //     updatedParams.set("multi_status", apiStatusList.join(","));
  //   } else {
  //     updatedParams.delete("multi_status");
  //   }

  //   // --- Visibility ---
  //   const allVisibilityValues = filterData.Visibility.map((v) => v.value);

  //   const selectedVisibility = globalFilterState.visibility || [];

  //   const selectedWithoutAll = selectedVisibility.filter((v) => v !== "all");

  //   const isAllSelected =
  //     selectedWithoutAll.length === allVisibilityValues.length - 1;

  //   if (selectedVisibility.length > 0 && !isAllSelected) {
  //     updatedParams.set("notice_access_level", selectedVisibility.join(","));
  //   } else {
  //     updatedParams.delete("notice_access_level");
  //   }

  //   const selection = globalFilterState.communitySelection || [];

  //   const fullDataMap = {};
  //   selectorOptions.forEach((community) => {
  //     fullDataMap[community.id] = {
  //       blockMap: {},
  //       blockIds: community.subOptions.map((b) => b.id),
  //     };

  //     community.subOptions.forEach((block) => {
  //       fullDataMap[community.id].blockMap[block.id] = {
  //         unitIds: block.childOptions?.map((u) => u.id) || [],
  //       };
  //     });
  //   });

  //   const finalCommunityIds = new Set();
  //   const finalBlockIds = new Set();
  //   const finalUnitIds = new Set();

  //   selection.forEach((selectedCommunity) => {
  //     const communityId = selectedCommunity.id;
  //     const selectedBlocks = selectedCommunity.subOptions || [];

  //     const allBlockIds = fullDataMap[communityId]?.blockIds || [];

  //     let allBlocksSelected = true;

  //     selectedBlocks.forEach((selectedBlock) => {
  //       const blockId = selectedBlock.id;
  //       const selectedUnits =
  //         selectedBlock.childOptions?.map((u) => u.id) || [];

  //       const allUnitIds =
  //         fullDataMap[communityId]?.blockMap[blockId]?.unitIds || [];

  //       const allUnitsSelected =
  //         selectedUnits.length === allUnitIds.length &&
  //         allUnitIds.every((id) => selectedUnits.includes(id));

  //       if (allUnitsSelected) {
  //         finalBlockIds.add(blockId);
  //       } else {
  //         selectedUnits.forEach((unitId) => finalUnitIds.add(unitId));
  //         allBlocksSelected = false;
  //       }
  //     });

  //     const selectedBlockIds = selectedBlocks.map((b) => b.id);
  //     const isAllBlocksSelected =
  //       selectedBlockIds.length === allBlockIds.length &&
  //       allBlockIds.every((id) => selectedBlockIds.includes(id));

  //     if (isAllBlocksSelected && allBlocksSelected) {
  //       finalCommunityIds.add(communityId);
  //       // remove block/unit if entire community is added
  //       selectedBlocks.forEach((b) => finalBlockIds.delete(b.id));
  //     }
  //   });
  //   // Set or delete based on collected IDs
  //   if (finalCommunityIds.size) {
  //     updatedParams.set("community_ids", [...finalCommunityIds].join(","));
  //   } else {
  //     updatedParams.delete("community_ids");
  //   }

  //   if (finalBlockIds.size) {
  //     updatedParams.set("block_ids", [...finalBlockIds].join(","));
  //   } else {
  //     updatedParams.delete("block_ids");
  //   }

  //   if (finalUnitIds.size) {
  //     updatedParams.set("unit_ids", [...finalUnitIds].join(","));
  //   } else {
  //     updatedParams.delete("unit_ids");
  //   }

  //   const ROUTE_STATUS_MAP = {
  //     all: "/notice_board",
  //     pending: "/pending_for_approval_notices",
  //     expiring: "/expiring-today",
  //     expired: "/expired_notices",
  //     rejected: "/rejected-notices",
  //   };

  //   if (selectedStatuses?.length > 1) {
  //     navigate(`${basePath}/?${updatedParams.toString()}`);
  //   } else if (location.pathname !== ROUTE_STATUS_MAP[selectedStatuses[0]]) {
  //     navigate(`${basePath}/?${updatedParams.toString()}`);
  //   } else {
  //     setSearchParams(updatedParams);
  //   }
  //   // setSearchParams(updatedParams);
  // };

  // const handleResetFilters = () => {
  //   setClearFilter(true);
  //   setGlobalFilterState((prev) => ({
  //     ...prev,
  //     date_range: "",
  //     start_date: "",
  //     end_date: "",
  //     status: statusOptions?.map((opt) => opt.value),
  //     visibility: filterData?.Visibility?.map((opt) => opt.value),
  //     communitySelection: [],
  //   }));

  //   const newPath = viewParam
  //     ? `${basePath || "/"}?view=${viewParam}`
  //     : basePath;

  //   navigate(newPath, { replace: true });
  //   onClose();
  // };

  const filteredOptions = filterData.Filters.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const shouldShowDot = (key, searchParams) => {
  //   // This key in your UI represents all three:
  //   if (key === "community_ids") {
  //     const community = searchParams.get("community_ids");
  //     const block = searchParams.get("block_ids");
  //     const unit = searchParams.get("unit_ids");

  //     const values = [community, block, unit].flatMap((param) =>
  //       param
  //         ? param
  //             .split(",")
  //             .map((s) => s.trim())
  //             .filter(Boolean)
  //         : []
  //     );

  //     return values.length > 0;
  //   }

  //   const param = searchParams.get(key);
  //   const isListKey = ["notice_access_level"];

  //   if (isListKey.includes(key)) {
  //     if (!param) return false;
  //     const items = param
  //       .split(",")
  //       .map((s) => s.trim())
  //       .filter(Boolean);
  //     return items.length > 0;
  //   }

  //   if (key === "status") {
  //     const param = searchParams.get("status");
  //     const multiStatus = searchParams.get("multi_status");
  //     return (param && param !== "all") || !!multiStatus;
  //   }

  //   if (key === "date_range") {
  //     return !!param;
  //   }

  //   return false;
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="90%"
      className="rounded-lg! relative"
      fullWidth
    >
      <DialogContent
        sx={{ borderRadius: "8px" }}
        className="min-h-[85vh]! max-h-[85vh]! p-0! flex flex-col md:flex-row! overflow-auto md:overflow-hidden rounded-lg!"
      >
        {/* Filters Column */}
        <div className="md:w-1/4 flex flex-col">
          <DialogTitle
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              padding: 0,
              backgroundColor: "white",
            }}
          >
            <div className="flex justify-between">
              <h4 className="px-6 py-4 font-semibold! text-base! text-[#4D4D4F]">
                Filters
              </h4>
              <button className={"mr-2 block md:hidden!"} onClick={onClose}>
                <LuCircleX size={24} />
              </button>
            </div>

            <TextField
              fullWidth
              size="small"
              placeholder="Search across filters"
              value={searchTerm}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s{2,}/g, " ");
                setSearchTerm(cleanedValue);
              }}
              className="px-3! border-y! border-[#EBEBEB]!"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  height: "50px",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              InputProps={{
                endAdornment: true && (
                  <InputAdornment position="end">
                    {searchTerm?.length > 0 && (
                      <button
                        className="cursor-pointer!"
                        onClick={() => {
                          setSearchTerm("");
                        }}
                      >
                        <LuX />
                      </button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </DialogTitle>

          <div className="flex-1 overflow-y-auto">
            <List dense className="p-0! divide-y divide-[#EBEBEB]">
              {filteredOptions?.map((opt, i) => {
                return (
                  <ListItem
                    key={i}
                    button
                    onClick={() => setFilter(opt.id)}
                    className={`rounded-md cursor-pointer transition-all ${
                      i === filter ? "bg-[#FBF5FF] text-[#884EA7]" : ""
                    } p-4! rounded-none hover:bg-[#FBF5FF]!`}
                  >
                    <ListItemText
                      primary={
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            {/* {shouldShowDot(opt.key, searchParams) && ( */}
                            <LuDot className="text-[#36AB6C]" size={18} />
                            {/* )} */}
                            {opt.label}
                          </div>
                          <LuChevronRight />
                        </div>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>

        <div className="md:w-3/4 flex flex-col justify-between md:border-l border-[#EBEBEB]">
          {filter === 0 && (
            <></>
            // <MainFilter
            //   open={open}
            //   onClose={onclose}
            //   options={selectorOptions}
            //   clearFilter={clearFilter}
            //   setClearFilter={setClearFilter}
            //   leftHeader="Communities"
            //   rightHeader="Select Blocks & Units"
            //   FromFilters={true}
            //   initialSelection={globalFilterState.communitySelection}
            //   onCloseCick={onClose}
            //   onSave={(selection) => {
            //     setGlobalFilterState((prev) => ({
            //       ...prev,
            //       communitySelection: selection,
            //     }));
            //   }}
            //   onReset={() => {
            //     setGlobalFilterState((prev) => ({
            //       ...prev,
            //       communitySelection: [],
            //     }));
            //   }}
            //   closeButton={false}
            //   containerClassName={"null"}
            //   noDataMsg={{
            //     title: "No filters applied",
            //     description: "Apply filters to find the right blocks and units",
            //   }}
            // />
          )}
          {filter === 1 && (
            <CheckboxFilter
              title="Visibility"
              type="checkbox"
              options={filterData.Visibility}
              value={globalFilterState?.visibility}
              onChange={handleGlobalFilterChange}
            />
          )}

          {filter === 2 && (
            <CheckboxFilter
              title="Status"
              type="checkbox"
              // type={"radio"}
              options={filterData.Status}
              value={globalFilterState?.status}
              onChange={handleGlobalFilterChange}
            />
          )}
          {filter === 3 && (
            <div className="flex flex-col md:!flex-row">
              <div
                className={`${
                  globalFilterState?.date_range === "custom"
                    ? "md:w-1/2 md:border-r border-[#EBEBEB]"
                    : "md:w-full"
                }`}
              >
                <CheckboxFilter
                  title="Date Range"
                  type="radio"
                  options={filterData.DateRange}
                  value={globalFilterState?.date_range}
                  onChange={handleGlobalFilterChange}
                />
              </div>

              {globalFilterState?.date_range === "custom" && (
                <div className="flex flex-col md:w-1/2">
                  <h4 className="p-4 font-semibold">Custom Date</h4>
                  <div className="flex flex-col gap-4 p-4 border-t border-[#EBEBEB]">
                    <div className="flex flex-col gap-3">
                      <FormLabel className="!text-[#4D4D4F]">From</FormLabel>

                      <DatePicker
                        open={isStartDatePickerOpen}
                        onOpen={() => setIsStartDatePickerOpen(true)}
                        onClose={() => setIsStartDatePickerOpen(false)}
                        value={globalFilterState?.start_date || null}
                        onChange={(val) =>
                          setGlobalFilterState((prev) => ({
                            ...prev,
                            start_date: val,
                          }))
                        }
                        slots={{
                          openPickerIcon: () => (
                            <LuCalendarDays color="#884EA7" size={16} />
                          ),
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            onClick: () => setIsStartDatePickerOpen(true),
                            sx: {
                              // height: "40px",
                              backgroundColor: "#FAFAFA",

                              "& .MuiPickersInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                                color: "#121212",
                                // padding: 0,
                                border: "0.5px solid #EBEBEB",
                                borderRadius: "4px",
                              },
                              "& .MuiInputBase-root": {},
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                              "&:hover": {
                                borderWidth: "0.5px",
                              },

                              "&.Mui-focused": {
                                borderWidth: "0.5px",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <FormLabel className="!text-[#4D4D4F]">To</FormLabel>
                      <DatePicker
                        open={isEndDatePickerOpen}
                        onOpen={() => setIsEndDatePickerOpen(true)}
                        onClose={() => setIsEndDatePickerOpen(false)}
                        disabled={!globalFilterState.start_date}
                        value={globalFilterState.end_date || null}
                        onChange={(val) =>
                          setGlobalFilterState((prev) => ({
                            ...prev,
                            end_date: val,
                          }))
                        }
                        minDate={globalFilterState.start_date || null}
                        maxDate={new Date()}
                        slots={{
                          openPickerIcon: () => (
                            <LuCalendarDays color="#884EA7" size={16} />
                          ),
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            onClick: () => setIsEndDatePickerOpen(true),
                            sx: {
                              // height: "40px",
                              backgroundColor: "#FAFAFA",

                              "& .MuiPickersInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                                color: "#121212",
                                // padding: 0,
                                border: "0.5px solid #EBEBEB",
                                borderRadius: "4px",
                              },
                              "& .MuiInputBase-root": {},
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                              "&:hover": {
                                borderWidth: "0.5px",
                              },

                              "&.Mui-focused": {
                                borderWidth: "0.5px",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* <div className="w-full h-12"></div> */}
          {/* Footer Actions */}
          <DialogActions
            sx={{
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              backgroundColor: "white",
              borderTop: "1px solid #ebebeb",
              padding: 0,
            }}
          >
            <div className="flex justify-end gap-2 p-4">
              <Button
                // disabled={isFilterUnchanged}
                variant="outlined"
                onClick={() => handleResetFilters()}
              >
                Reset
              </Button>
              <Button
                // variant="contained"
                onClick={() => {
                  handleApplyFilters();
                  onClose();
                }}
                // disabled={isApplyDisabled || isFilterUnchanged}
              >
                Apply
              </Button>
            </div>
          </DialogActions>
        </div>
      </DialogContent>
      <IconButton
        onClick={() => {
          onClose?.();
        }}
        className="!hidden md:!block md:!absolute md:!top-2 md:!right-2 z-10 mr-2"
      >
        <LuCircleX size={24} />
      </IconButton>
    </Dialog>
  );
}

function DateRangeFilter({ startDate = "", endDate = "", onChange }) {
  const handleChange = (field, value) => {
    const updated = {
      startDate: field === "start" ? value : startDate,
      endDate: field === "end" ? value : endDate,
    };
    onChange(updated);
  };
  return (
    <Box className="h-full ">
      <h4 className="p-4 font-semibold">Custom Date</h4>
      <div className="p-4 flex flex-col gap-4 border-t border-[#EBEBEB]">
        <TextField
          fullWidth
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => handleChange("start", e.target.value)}
        />
        <TextField
          fullWidth
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => handleChange("end", e.target.value)}
        />
      </div>
    </Box>
  );
}

function CheckboxFilter({ title, options, type, value, onChange }) {
  const key = title.toLowerCase().replace(/\s+/g, "_");

  const select = (opt) => {
    const selectedValue = typeof opt === "object" ? opt.value : opt;
    const allValues = options?.map((o) =>
      typeof o === "object" ? o.value : o
    );
    const isMultiSelectToggleKey = ["visibility", "status"];
    let newValue;

    if (type === "radio") {
      newValue = selectedValue;
    } else {
      if (isMultiSelectToggleKey.includes(key) && selectedValue === "all") {
        const isAllSelected = value.length === allValues.length;
        newValue = isAllSelected ? [] : allValues;
      } else {
        if (value?.includes(selectedValue)) {
          newValue = value.filter((item) => item !== selectedValue);
        } else {
          newValue = [...value, selectedValue];
        }

        const rest = allValues.filter((v) => v !== "all");
        const selectedWithoutAll = newValue.filter((v) => v !== "all");

        if (isMultiSelectToggleKey.includes(key)) {
          if (selectedWithoutAll.length === rest.length) {
            newValue = allValues;
          } else {
            if (newValue.length === 1 && newValue[0] === "all") {
              newValue = [];
            } else {
              newValue = newValue.filter((v) => v !== "all");
            }
          }
        }

        newValue = [...new Set(newValue)];
      }
    }

    onChange(key, newValue);
  };

  const isChecked = (opt) => {
    const selectedValue = typeof opt === "object" ? opt.value : opt;
    return value?.includes(selectedValue);
  };

  const getLabel = (opt) => (typeof opt === "object" ? opt.label : opt);

  return (
    <>
      <DialogTitle
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: 0,
          backgroundColor: "white",
        }}
      >
        <h4 className="px-6 py-4 !font-semibold !text-base text-[#4D4D4F]">
          {title}
        </h4>
      </DialogTitle>
      <div className="flex-1 overflow-y-auto border-t border-[#EBEBEB] divide-y divide-[#EBEBEB]">
        {options?.map((opt, i) => (
          <Box
            key={i}
            component="label"
            className="p-6 flex items-center gap-3 cursor-pointer"
          >
            {type === "radio" ? (
              <Radio
                checked={isChecked(opt)}
                onChange={() => select(opt)}
                name={title}
                className="size-2"
              />
            ) : (
              <Checkbox
                checked={isChecked(opt)}
                onChange={() => select(opt)}
                className="!p-0"
              />
            )}
            <Typography>{getLabel(opt)}</Typography>
          </Box>
        ))}
      </div>
    </>
  );
}
