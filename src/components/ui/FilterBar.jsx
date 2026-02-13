import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineCalendarToday, MdArrowDropDown } from "react-icons/md";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { LuFilter } from "react-icons/lu";
import FilterModal from "./FilterModal";
// import FilterModal from "./FilterModal";
// import { context } from "../../context/context";
// import { useSelector } from "react-redux";

export default function FilterBar({
  config,
  filters = {},
  values = {},
  onChange,
  setGlobalFilterState,
  globalFilterState,
  handleGlobalFilterChange,
  selectorOptions,
  filterDataOptions,
  toggleAllFilters,
  handleResetFilters,
  handleApplyFilters,
  filterKeyToTabIndexMap,
  shouldShowDot,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const dateRef = useRef();
  const [selectedFilterKey, setSelectedFilterKey] = useState(null);
  // Detect outside click to close date picker

  console.log(filters, "filters");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderInput = (key, value) => (
    <div key={key} className="flex flex-col">
      <label className="text-sm font-medium text-[#4D4D4F] capitalize mb-3">
        {key.replace(/([A-Z])/g, " $1")}
      </label>
      <button
        // disabled={loadingCommunityBlockUnit || loadingPermissions}
        onClick={() => {
          const tabIndex = filterKeyToTabIndexMap[key];
          setSelectedFilterKey(tabIndex);
          setFilterModal(!filterModal);
        }}
        className="relative cursor-pointer w-full h-[34px] bg-[#FAFAFA] border-[0.5px] border-[#EBEBEB] rounded px-3 py-2 pr-8"
      >
        <p className="font-medium text-left text-[#884EA7] text-sm leading-[18px] line-clamp-1">
          {value || ""}
        </p>

        <LuFilter className="absolute right-2 top-1/2 -translate-y-1/2 text-[#884EA7] pointer-events-none" />
      </button>
    </div>
  );

  return (
    <>
      <div className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {Object.entries(filters).map(([key, value]) => {
            return renderInput(key, value);
          })}
        </div>
      </div>
      <FilterModal
        config={config}
        open={filterModal}
        onClose={() => setFilterModal(!filterModal)}
        globalFilterState={globalFilterState}
        setGlobalFilterState={setGlobalFilterState}
        handleGlobalFilterChange={handleGlobalFilterChange}
        selectorOptions={selectorOptions}
        selectedFilterKey={selectedFilterKey}
        filterDataOptions={filterDataOptions}
        toggleAllFilters={toggleAllFilters}
        handleResetFilters={handleResetFilters}
        handleApplyFilters={handleApplyFilters}
        shouldShowDot={shouldShowDot}
      />
    </>
  );
}
