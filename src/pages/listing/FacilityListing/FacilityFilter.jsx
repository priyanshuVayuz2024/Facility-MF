import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  capitalize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "../../../components/ui/FilterBar";

const selectorOptions = [
  {
    id: "2",
    name: "Move In Pradise Estate",
  },
  {
    id: "7",
    name: "Kohinoor",
  },
  {
    id: "9",
    name: "Payu smart Comm",
  },
  {
    id: "10",
    name: "Chat Community 2207",
  },
  {
    id: "11",
    name: "Sep 29 UAE community",
  },
];
const filterChargeable = [
  { label: "All", value: "all" },
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
const filterCategory = [
  { label: "All", value: "all" },
  { label: "Areboic", value: "Areboic" },
  { label: "Activity", value: "Activity" },
  { label: "Guest Room  ", value: "GuestRoom" },
  { label: "Party Hall", value: "PartyHall" },
  { label: "Library", value: "Library" },
  { label: "parking", value: "parking" },
];

const facilityFilterConfig = [
  {
    id: 0,
    label: "Communities",
    key: "communitySelection",
    type: "community_tree",
    options: selectorOptions,
  },
  {
    id: 1,
    label: "Category",
    key: "category",
    type: "checkbox",
    options: filterCategory,
  },
  {
    id: 2,
    label: "Chargeable",
    key: "chargeable",
    type: "checkbox",
    options: filterChargeable,
  },
  {
    id: 3,
    label: "Approval Needed",
    key: "approval_needed",
    type: "checkbox",
    options: filterChargeable,
  },
];

function FacilityFilter() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const communityBlockMap = {};

  const [facilityGlobalFilterState, setFacilityGlobalFilterState] = useState({
    category: filterCategory?.map((opt) => opt.value),
    chargeable: filterChargeable?.map((opt) => opt.value),
    approval_needed: filterChargeable?.map((opt) => opt.value),
    communitySelection: [],
  });

  const handleBookingGlobalFilterChange = (key, newValue) => {
    setFacilityGlobalFilterState((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "";

  console.log(facilityGlobalFilterState, "facilityGlobalFilterState");

  const getUpdatedFiltersBarData = (facilityGlobalFilterState) => {
    const {
      communitySelection = [],
      chargeable,
      category,
      approval_needed,
    } = facilityGlobalFilterState;
    const communityNames = communitySelection.map((c) => c.name);
    const visibleCommunities =
      communityNames?.length === 0 ||
      communityNames?.length == Object.entries(communityBlockMap)?.length
        ? "All"
        : communityNames.slice(0, 2).join(", ") +
          (communityNames.length > 2 ? "..." : "");

    const updatedFilters = {
      Communities: visibleCommunities || "All",
      Category:
        !category?.length || category.includes("all")
          ? "All"
          : category?.map((str) => capitalize(str)).join(", "),
      Chargeable:
        !chargeable?.length || chargeable.includes("all")
          ? "All"
          : chargeable?.map((str) => capitalize(str)).join(", "),
      "Approval Needed": approval_needed?.includes("all")
        ? "All"
        : approval_needed?.map((str) => capitalize(str)),
    };

    return updatedFilters;
  };

  const filterDataOptions = {
    Filters: [
      { id: 0, label: "Communities", key: "community_ids" },
      { id: 1, label: "Category", key: "category" },
      { id: 2, label: "Chargeable", key: "chargeable" },
      { id: 3, label: "Approval Needed", key: "approval_needed" },
    ],
  };

  const filterKeyToTabIndexMap = {
    Communities: 0,
    Chargeable: 2,
    "Approval Needed": 3,
    Category: 1,
    // Add all relevant mappings here
  };

  const handleResetFilters = () => {
    setFacilityGlobalFilterState((prev) => ({
      ...prev,
      category: filterCategory?.map((opt) => opt.value),
      chargeable: filterChargeable?.map((opt) => opt.value),
      approval_needed: filterChargeable?.map((opt) => opt.value),
      communitySelection: [],
    }));

    navigate("/facilities", { replace: true });
  };

  const handleApplyFilters = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("page");

    const allChargeableValues = filterChargeable.map((v) => v.value);

    const selectedChargable = facilityGlobalFilterState.chargeable || [];

    const selectedWithoutAll = selectedChargable.filter((v) => v !== "all");

    const isAllSelected =
      selectedWithoutAll.length === allChargeableValues.length - 1;

    if (selectedChargable.length > 0 && !isAllSelected) {
      updatedParams.set("chargeable", selectedChargable.join(","));
    } else {
      updatedParams.delete("chargeable");
    }

    const selectedCategory = facilityGlobalFilterState?.category || [];
    const selectedCategoryWithoutAll = selectedCategory.filter(
      (v) => v !== "all",
    );

    const isAllCategorySelected =
      selectedCategoryWithoutAll.length == filterCategory.length - 1;

    if (selectedCategory.length > 0 && !isAllCategorySelected) {
      updatedParams.set("category", selectedCategory.join(","));
    } else {
      updatedParams.delete("category");
    }

    const selectedApprovalLevel =
      facilityGlobalFilterState?.approval_needed || [];
    const selectedApprovalWithoutAll = selectedApprovalLevel.filter(
      (v) => v !== "all",
    );
    const isAllApprovalLevelSelected =
      selectedApprovalWithoutAll.length == filterChargeable?.length - 1;

    if (selectedApprovalLevel.length > 0 && !isAllApprovalLevelSelected) {
      updatedParams.set("approval_needed", selectedApprovalLevel.join(","));
    } else {
      updatedParams.delete("approval_needed");
    }
    const selection = facilityGlobalFilterState.communitySelection || [];

    // ---------------- ALL COMMUNITY IDS ----------------
    const allCommunityIds = selectorOptions.map((c) => String(c.id));

    // ---------------- SELECTED IDS ----------------
    const selectedCommunityIds = selection
      .map((c) => String(c.id))
      .filter(Boolean);

    // ---------------- CHECK IF ALL SELECTED ----------------
    const isAllCommunitiesSelected =
      selectedCommunityIds.length === allCommunityIds.length &&
      allCommunityIds.every((id) => selectedCommunityIds.includes(id));

    // ---------------- SET / DELETE PARAM ----------------
    if (selectedCommunityIds.length > 0 && !isAllCommunitiesSelected) {
      updatedParams.set("community_ids", selectedCommunityIds.join(","));
    } else {
      updatedParams.delete("community_ids");
    }

    // if (selectedStatuses?.length > 1) {
    //   navigate(`${basePath}/?${updatedParams.toString()}`);
    // } else if (location.pathname !== ROUTE_STATUS_MAP[selectedStatuses[0]]) {
    //   navigate(`${basePath}/?${updatedParams.toString()}`);
    // } else {
    setSearchParams(updatedParams);
    // }
    // setSearchParams(updatedParams);
  };

  const rebuildStructuredFromUrl = (
    ids = [],
    selectorOptions = [],
    type = "unit",
  ) => {
    const structured = [];

    for (const community of selectorOptions) {
      const matchedSubOptions = [];

      for (const block of community.subOptions || []) {
        let matchedUnits = [];

        if (type === "unit") {
          matchedUnits = block.childOptions?.filter((unit) =>
            ids.includes(unit.id.toString()),
          );
        }

        const isBlockMatch =
          type === "block" && ids.includes(block.id.toString());

        if ((type === "unit" && matchedUnits?.length) || isBlockMatch) {
          matchedSubOptions.push({
            id: block.id,
            name: block.name,
            childOptions:
              type === "unit" ? matchedUnits : block.childOptions || [],
          });
        }
      }

      const isCommunityMatch =
        type === "community" && ids.includes(community.id.toString());

      if (matchedSubOptions.length || isCommunityMatch) {
        structured.push({
          id: community.id,
          name: community.name,
          subOptions:
            type === "community"
              ? community.subOptions || []
              : matchedSubOptions,
        });
      }
    }

    return structured;
  };

  useEffect(() => {
    // ---------------- GET ALL OPTION VALUES ----------------
    const allChargeable = filterChargeable.map((opt) => opt.value);

    const allCategory = filterCategory.map((opt) => opt.value);

    const allApprovalLevel = filterChargeable.map((opt) => opt.value);

    // ---------------- URL PARAMS ----------------
    const urlChargeable = (searchParams.get("chargeable") || "")
      .split(",")
      .filter(Boolean);

    const urlCategory = (searchParams.get("category") || "")
      .split(",")
      .filter(Boolean);

    const urlApprovalLevel = (searchParams.get("approval_needed") || "")
      .split(",")
      .filter(Boolean);

    // ---------------- DEFAULT STATE ----------------
    const newState = {
      chargeable: urlChargeable.length ? urlChargeable : allChargeable,
      approval_needed: urlApprovalLevel.length
        ? urlApprovalLevel
        : allApprovalLevel,
      category: urlCategory.length ? urlCategory : allCategory,

      communitySelection: [],
    };

    // ---------------- COMMUNITY ----------------
    const communityIds = (searchParams.get("community_ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (selectorOptions.length) {
      const byCommunity =
        communityIds.length > 0
          ? rebuildStructuredFromUrl(communityIds, selectorOptions, "community")
          : [];

      const merged = JSON.parse(JSON.stringify(byCommunity));

      newState.communitySelection = merged;
    }

    // ---------------- SET STATE ----------------
    setFacilityGlobalFilterState(newState);
  }, [selectorOptions, searchParams]);

  const shouldShowDot = (key, searchParams) => {
    console.log(key, "key");
    if (key === "community_ids") {
      const community = searchParams.get("community_ids");
      const block = searchParams.get("block_ids");
      const unit = searchParams.get("unit_ids");
      const values = [community, block, unit].flatMap((param) =>
        param
          ? param
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      );
      return values.length > 0;
    }
    const param = searchParams.get(key);
    const isListKey = ["chargeable"];
    if (isListKey.includes(key)) {
      if (!param) return false;
      return !!param;
    }
    const multiSelectKeys = ["category", "approval_needed"];

    if (multiSelectKeys.includes(key)) {
      const param = searchParams.get(key);

      if (!param) return false;

      const values = param
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      return values.length > 0;
    }
    return false;
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
            config={facilityFilterConfig}
            filters={getUpdatedFiltersBarData(facilityGlobalFilterState)}
            globalFilterState={facilityGlobalFilterState}
            setGlobalFilterState={setFacilityGlobalFilterState}
            handleGlobalFilterChange={handleBookingGlobalFilterChange}
            selectorOptions={selectorOptions}
            filterDataOptions={filterDataOptions}
            toggleAllFilters={["chargeable", "approval_needed", "category"]}
            handleResetFilters={handleResetFilters}
            handleApplyFilters={handleApplyFilters}
            filterKeyToTabIndexMap={filterKeyToTabIndexMap}
            shouldShowDot={shouldShowDot}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FacilityFilter;
