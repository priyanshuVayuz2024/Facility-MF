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
import { DatePicker } from "@mui/x-date-pickers";
import { MainFilter } from "./selectorPopup";

export default function FilterModal({
  open,
  onClose,
  globalFilterState,
  setGlobalFilterState,
  handleGlobalFilterChange,
  selectorOptions,
  selectedFilterKey,
  filterDataOptions,
  toggleAllFilters,
  handleResetFilters,
  handleApplyFilters,
  shouldShowDot,
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

  useEffect(() => {
    if (open && selectedFilterKey != null) {
      setFilter(selectedFilterKey);
    }
  }, [open, selectedFilterKey]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "";

  const filteredOptions = filterDataOptions.Filters.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterClose = () => {
    onClose();
    handleResetFilters();
    setClearFilter(true);
  };

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
                            {shouldShowDot(opt.key, searchParams) && (
                              <LuDot className="text-[#36AB6C]" size={18} />
                            )}
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
            <MainFilter
              open={open}
              onClose={onclose}
              options={selectorOptions}
              clearFilter={clearFilter}
              setClearFilter={setClearFilter}
              leftHeader="Communities"
              rightHeader="Select Blocks & Units"
              FromFilters={true}
              initialSelection={globalFilterState.communitySelection}
              onCloseCick={onClose}
              onSave={(selection) => {
                setGlobalFilterState((prev) => ({
                  ...prev,
                  communitySelection: selection,
                }));
              }}
              onReset={() => {
                setGlobalFilterState((prev) => ({
                  ...prev,
                  communitySelection: [],
                }));
              }}
              closeButton={false}
              containerClassName={"null"}
              noDataMsg={{
                title: "No filters applied",
                description: "Apply filters to find the right blocks and units",
              }}
            />
          )}
          {filter === 1 && (
            <CheckboxFilter
              title="Chargeable"
              type="checkbox"
              options={filterDataOptions.Chargeable}
              value={globalFilterState?.chargeable}
              onChange={handleGlobalFilterChange}
              toggleAllFilters={toggleAllFilters}
            />
          )}

          {filter === 2 && (
            <CheckboxFilter
              title="Status"
              type="checkbox"
              // type={"radio"}
              options={filterDataOptions.Status}
              value={globalFilterState?.status}
              onChange={handleGlobalFilterChange}
              toggleAllFilters={toggleAllFilters}
            />
          )}
          {filter === 3 && (
            <div className="flex flex-col md:flex-row!">
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
                  options={filterDataOptions.DateRange}
                  value={globalFilterState?.date_range}
                  onChange={handleGlobalFilterChange}
                />
              </div>

              {globalFilterState?.date_range === "custom" && (
                <div className="flex flex-col md:w-1/2">
                  <h4 className="p-4 font-semibold">Custom Date</h4>
                  <div className="flex flex-col gap-4 p-4 border-t border-[#EBEBEB]">
                    <div className="flex flex-col gap-3">
                      <FormLabel className="text-[#4D4D4F]!">From</FormLabel>

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
                      <FormLabel className="text-[#4D4D4F]!">To</FormLabel>
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
                onClick={() => handleFilterClose()}
              >
                Reset
              </Button>
              <Button
                variant="contained"
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
        className="hidden! md:block! md:absolute! md:top-2! md:right-2! z-10 mr-2"
      >
        <LuCircleX size={24} />
      </IconButton>
    </Dialog>
  );
}

function CheckboxFilter({
  title,
  options,
  type,
  value,
  onChange,
  toggleAllFilters,
}) {
  const key = title.toLowerCase().replace(/\s+/g, "_");

  const select = (opt) => {
    const selectedValue = typeof opt === "object" ? opt.value : opt;
    const allValues = options?.map((o) =>
      typeof o === "object" ? o.value : o
    );

    const isMultiSelectToggleKey = toggleAllFilters;
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
                className="p-0!"
              />
            )}
            <Typography>{getLabel(opt)}</Typography>
          </Box>
        ))}
      </div>
    </>
  );
}
