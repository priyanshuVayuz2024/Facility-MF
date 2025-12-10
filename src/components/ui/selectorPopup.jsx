import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Collapse,
  IconButton,
  Typography,
  Button,
  DialogTitle,
  DialogActions,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { LuChevronRight, LuCircleX, LuX } from "react-icons/lu";
import { NoData } from "./noData";

const convertStructuredToSelectionMap = (structured = []) => {
  const map = {};
  for (const item of structured) {
    const sub = item.subOptions?.map((s) => s.id.toString()) || [];
    const child =
      item.subOptions?.flatMap(
        (s) => s.childOptions?.map((c) => c.id.toString()) || []
      ) || [];
    map[item.id.toString()] = {
      main: true,
      sub,
      child,
    };
  }
  return map;
};

const convertSelectionMapToStructured = (selection, baseOptions) => {
  const structured = [];
  for (const [mainId, sel] of Object.entries(selection)) {
    if (!sel?.main) continue;
    const main = baseOptions.find((o) => o.id.toString() === mainId);
    if (!main) continue;

    const subOptions =
      main.subOptions
        ?.filter((sub) => sel.sub.includes(sub.id.toString()))
        .map((sub) => ({
          ...sub,
          childOptions:
            sub.childOptions?.filter((child) =>
              sel.child.includes(child.id.toString())
            ) || [],
        })) || [];

    structured.push({
      id: main.id,
      name: main.name,
      subOptions,
    });
  }

  return structured;
};

const SelectorPopup = ({
  open,
  onClose,
  onSave,
  readOnly = false,
  leftHeader = "Options",
  rightHeader = "Details",
  initialSelection = [],
  options = [],
  searchPlaceholderLeft = "Search Communities",
  searchPlaceholderRight = "Search Block or Unit",
  hideSearch
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="100%" fullWidth>
      <DialogContent className="p-0! rounded-lg! relative overflow-hidden!">
        <MainFilter
          open={open}
          leftHeader={leftHeader}
          onClose={onClose}
          readOnly={readOnly}
          rightHeader={rightHeader}
          onSave={onSave}
          initialSelection={initialSelection}
          options={options}
          searchPlaceholderLeft={searchPlaceholderLeft}
          searchPlaceholderRight={searchPlaceholderRight}
          hideSearch={hideSearch}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SelectorPopup;

export const MainFilter = ({
  open,
  onClose,
  onSave,
  readOnly,
  leftHeader,
  rightHeader,
  initialSelection,
  options,
  onReset,
  FromFilters,
  clearFilter,
  setClearFilter,
  onCloseCick,
  closeButton = true,
  containerClassName,
  noDataMsg,
  searchPlaceholderLeft,
  searchPlaceholderRight,
  hideSearch
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [rightSearchInput, setRightSearchInput] = useState("");
  const [rightSearchTerm, setRightSearchTerm] = useState("");

  const [activeOptionId, setActiveOptionId] = useState(null);
  const [expandedSub, setExpandedSub] = useState({});
  const [selection, setSelection] = useState({});

  const [loading, setLoading] = useState(true);

  const dataSource = useMemo(
    () => (readOnly ? initialSelection : options),
    [readOnly, options, initialSelection]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300); // delay in ms

    return () => clearTimeout(timeout); // cleanup previous timeout
  }, [searchInput]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRightSearchTerm(rightSearchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [rightSearchInput]);

  useEffect(() => {
    if (!open) return;

    const initial = readOnly ? initialSelection : options;

    // Only set active option if not already set
    if (activeOptionId === null && initial?.length > 0) {
      setActiveOptionId(initial[0].id);
    }

    // Only set expandedSub once on open
    setExpandedSub({});

    if (!readOnly) {
      const map = convertStructuredToSelectionMap(initialSelection);
      setSelection(map);
    }
    setLoading(false);
  }, [open]);

  const toggleExpand = (id) => {
    setExpandedSub((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isChecked = (mainId, subId, childId) => {
    const sel = selection[mainId];
    if (!sel) return false;
    if (childId) return sel.child?.includes(childId.toString());
    if (subId) return sel.sub?.includes(subId.toString());
    return sel.main;
  };

  const updateSelection = (mainId, subId, childId, checked) => {
    setSelection((prev) => {
      const current = prev[mainId] || { main: false, sub: [], child: [] };
      let newSub = [...current.sub];
      let newChild = [...current.child];

      if (childId) {
        const cid = childId.toString();
        if (checked) newChild.push(cid);
        else newChild = newChild.filter((id) => id !== cid);

        const parentSub = dataSource
          .find((o) => o.id === mainId)
          ?.subOptions.find((s) =>
            s.childOptions?.some((c) => c.id === childId)
          );

        if (parentSub) {
          const allChildren = parentSub.childOptions.map((c) =>
            c.id.toString()
          );
          const selectedChildren = newChild.filter((id) =>
            allChildren.includes(id)
          );
          const sid = parentSub.id.toString();

          if (selectedChildren?.length > 0 && !newSub.includes(sid)) {
            newSub.push(sid);
          } else if (selectedChildren?.length === 0 && newSub.includes(sid)) {
            newSub = newSub.filter((id) => id !== sid);
          }
        }
      } else if (subId) {
        const sid = subId.toString();
        const sub = dataSource
          .find((o) => o.id === mainId)
          ?.subOptions.find((s) => s.id === subId);
        const childIds = sub?.childOptions?.map((c) => c.id.toString()) || [];
        if (checked) {
          newSub.push(sid);
          newChild = [...new Set([...newChild, ...childIds])];
        } else {
          newSub = newSub.filter((id) => id !== sid);
          newChild = newChild.filter((id) => !childIds.includes(id));
        }
      } else {
        const subs = dataSource.find((o) => o.id === mainId)?.subOptions || [];
        const subIds = subs.map((s) => s.id.toString());
        const childIds = subs.flatMap(
          (s) => s.childOptions?.map((c) => c.id.toString()) || []
        );
        if (checked) {
          newSub = subIds;
          newChild = childIds;
        } else {
          newSub = [];
          newChild = [];
        }
      }

      return {
        ...prev,
        [mainId]: {
          main: checked || newSub?.length > 0 || newChild?.length > 0,
          sub: newSub,
          child: newChild,
        },
      };
    });
  };

  useEffect(() => {
    if (FromFilters && Object.entries(selection)?.length > 0) {
      onSave(convertSelectionMapToStructured(selection, dataSource));
    }
  }, [selection]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return dataSource;
    return dataSource.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, dataSource]);

  const getCounts = (mainId, subId) => {
    const main = dataSource.find((o) => o.id === mainId);
    const sel = selection[mainId];
    if (!main || !sel) return {};
    if (subId) {
      const childList =
        main.subOptions.find((s) => s.id === subId)?.childOptions || [];
      const count = childList.filter((c) =>
        sel.child?.includes(c.id.toString())
      )?.length;
      return { childCount: count };
    } else {
      const count = sel.sub?.length || 0;
      return { subCount: count };
    }
  };

  const isMainIndeterminate = (mainId) => {
    const sel = selection[mainId];
    const option = dataSource.find((o) => o.id === mainId);
    if (!sel || !option?.subOptions?.length) return false;

    const totalSub = option.subOptions?.length;
    const selectedSub = sel.sub?.length || 0;

    return selectedSub > 0 && selectedSub < totalSub;
  };

  const isSubIndeterminate = (mainId, subId) => {
    const sel = selection[mainId];
    const option = dataSource.find((o) => o.id === mainId);
    const sub = option?.subOptions?.find((s) => s.id === subId);

    if (!sel || !sub?.childOptions?.length) return false;

    const totalChild = sub.childOptions.length;
    const selectedChild = sel.child?.filter((id) =>
      sub.childOptions.some((c) => c.id.toString() === id)
    )?.length;

    return selectedChild > 0 && selectedChild < totalChild;
  };

  useEffect(() => {
    if (clearFilter) {
      setSelection({});
      setClearFilter(false);
    }
  }, [clearFilter]);

  let suboptionsFiltered =
    activeOptionId &&
    dataSource
      .find((o) => o.id === activeOptionId)
      ?.subOptions?.filter((sub) => {
        const subNameMatch = sub.name
          .toLowerCase()
          .includes(rightSearchTerm.toLowerCase());
        const childMatch = sub.childOptions?.some((child) =>
          child.name.toLowerCase().includes(rightSearchTerm.toLowerCase())
        );
        return subNameMatch || childMatch;
      });

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={300}
      >
        <CircularProgress />
      </Box>
    );
  }

  const areAllCommunitiesSelected = () => {
    return (
      filteredOptions.length > 0 &&
      filteredOptions.every((opt) => {
        const sel = selection[opt.id];
        return sel?.main;
      })
    );
  };

  const isSomeCommunitiesSelected = () => {
    return filteredOptions.some((opt) => selection[opt.id]?.main);
  };
  return (
    <div
      className={`${containerClassName ? containerClassName : "min-h-[85vh] max-h-[85vh]"
        } flex flex-col md:flex-row overflow-auto md:overflow-hidden`}
    >
      <Box className="md:w-1/3 flex flex-col">
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
              {leftHeader}
            </h4>
            {closeButton && (
              <button className={"mr-2 block md:hidden!"} onClick={onClose}>
                <LuCircleX size={24} />
              </button>
            )}
          </div>
          {/* {!readOnly && ( */}
          {!hideSearch && <TextField
            fullWidth
            size="small"
            placeholder={searchPlaceholderLeft}
            value={searchInput}
            onChange={(e) => {
              const input = e.target.value;

              let sanitizedInput = input
                .replace(/^\s+/, "")
                .replace(/\s{2,}/g, " ");
              if (activeOptionId) {
                setActiveOptionId(null);
              }
              setSearchInput(sanitizedInput);
            }}
            className="px-3! border-noned! border-y! border-[#EBEBEB]!"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                height: "50px",
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            InputProps={
              searchInput && {
                // startAdornment: (
                //   <InputAdornment position="start">
                //     <LuSearch className="text-[#ADADAD]" size={16} />
                //   </InputAdornment>
                // ),
                endAdornment: true && (
                  <InputAdornment position="end">
                    <button
                      className="cursor-pointer!"
                      onClick={() => {
                        setSearchInput("");
                      }}
                    >
                      <LuX />
                    </button>
                  </InputAdornment>
                ),
              }
            }
          />}
        </DialogTitle>
        {/* )} */}
        <div className="flex-1 overflow-y-auto">
          <List dense className="p-0! divide-y divide-[#EBEBEB]">
            {!readOnly && (
              <ListItem
                button
                // onClick={() => {
                //   const isAllSelected = areAllCommunitiesSelected();
                //   filteredOptions.forEach((opt) =>
                //     updateSelection(opt.id, null, null, !isAllSelected)
                //   );
                // }}
                className={`p-6! rounded-none hover:bg-[#FBF5FF]!`}
              >
                <Checkbox
                  className="p-0!"
                  checked={areAllCommunitiesSelected()}
                  indeterminate={
                    isSomeCommunitiesSelected() && !areAllCommunitiesSelected()
                  }
                  onChange={() => {
                    const isAllSelected = areAllCommunitiesSelected();
                    filteredOptions.forEach((opt) =>
                      updateSelection(opt.id, null, null, !isAllSelected)
                    );
                  }}
                />
                <ListItemText
                  primary={
                    <div className={`${!readOnly && "ps-3"} flex justify-between items-center`}>
                      <h4 className="text-[16px] text-[#121212]">
                        All
                      </h4>
                    </div>
                  }
                />
              </ListItem>
            )}
            {filteredOptions?.map((opt) => {
              const { subCount = 0 } = getCounts(opt.id);
              return (
                <ListItem
                  key={opt.id}
                  button
                  onClick={() => {
                    setActiveOptionId(opt.id);
                    // updateSelection(opt.id, null, null, !isChecked(opt.id));
                  }}
                  className={`rounded-md cursor-pointer transition-all ${activeOptionId === opt.id
                    ? "bg-[#FBF5FF] text-[#884EA7]"
                    : ""
                    } p-6! rounded-none hover:bg-[#FBF5FF]!`}
                >
                  {!readOnly && (
                    <Checkbox
                      className="p-0!"
                      checked={isChecked(opt.id)}
                      indeterminate={isMainIndeterminate(opt.id)}
                      onChange={(e) =>
                        updateSelection(opt.id, null, null, e.target.checked)
                      }
                    />
                  )}
                  <ListItemText
                    primary={
                      <div className={`${!readOnly && "ps-3"} flex justify-between items-center`}>
                        <h4 className="text-[16px]">{opt.name}</h4>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveOptionId(opt.id);
                          }}
                          className="flex items-center gap-3"
                        >
                          {!readOnly && subCount > 0 && (
                            <p className="text-[#884EA7]" ml={1}>
                              {opt?.subOptions?.length == subCount &&
                                subCount != 0
                                ? "All"
                                : subCount}
                            </p>
                          )}
                          <LuChevronRight />
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Box>

      <Box className="md:w-2/3 flex flex-col justify-between md:border-l border-[#EBEBEB]">
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
              {rightHeader}
            </h4>
            {closeButton && (
              <button
                className={"mr-2 hidden md:block!"}
                onClick={onCloseCick || onClose}
              >
                <LuCircleX size={24} />
              </button>
            )}
          </div>
          {activeOptionId && !hideSearch && (
            <TextField
              fullWidth
              size="small"
              placeholder={searchPlaceholderRight}
              value={rightSearchInput}
              onChange={(e) => {
                const input = e.target.value;

                const sanitizedInput = input
                  .replace(/^\s+/, "")
                  .replace(/\s{2,}/g, " ");

                setRightSearchInput(sanitizedInput);
              }}
              className="px-3! border-noned! border-y! border-[#EBEBEB]!"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  height: "50px",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              InputProps={
                rightSearchInput?.length > 0 && {
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <LuSearch className="text-[#ADADAD]" size={16} />
                  //   </InputAdornment>
                  // ),
                  endAdornment: true && (
                    <InputAdornment position="end">
                      <button
                        className="cursor-pointer!"
                        onClick={() => {
                          setRightSearchInput("");
                        }}
                      >
                        <LuX />
                      </button>
                    </InputAdornment>
                  ),
                }
              }
            />
          )}
        </DialogTitle>
        {activeOptionId ? (
          <div className="p-6 flex flex-1 flex-col gap-6 overflow-y-auto">
            {activeOptionId &&
              suboptionsFiltered?.map((sub) => {
                const { childCount = 0 } = getCounts(activeOptionId, sub.id);

                return (
                  <div className="border-[0.5px] border-[#EBEBEB] rounded">
                    <Box
                      onClick={() => toggleExpand(sub.id)}
                      key={sub.id}
                      className="p-4 
                      rounded border-b border-[#EBEBEB] cursor-pointer"
                    // bg-[#F9F9F9]
                    >
                      <Box className="flex justify-between items-center">
                        <Box className="flex items-start gap-3">
                          {!readOnly && (
                            <Checkbox
                              className="p-0!"
                              checked={isChecked(activeOptionId, sub.id)}
                              indeterminate={isSubIndeterminate(
                                activeOptionId,
                                sub.id
                              )}
                              onChange={(e) =>
                                updateSelection(
                                  activeOptionId,
                                  sub.id,
                                  null,
                                  e.target.checked
                                )
                              }
                            />
                          )}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-[#121212] leading-5">
                              {sub.name}
                            </h4>
                            {!readOnly && childCount > 0 && (
                              <p className="font-medium text-xs text-[#4D4D4F] leading-[18px]">
                                {sub?.childOptions?.length == childCount &&
                                  childCount != 0
                                  ? "All"
                                  : `${childCount} selected`}
                              </p>
                            )}
                            {!readOnly && childCount == 0 && (
                              <p className="font-medium text-xs text-[#4D4D4F] leading-[18px]">
                                Select this block to choose units
                              </p>
                            )}
                          </div>
                        </Box>
                        {sub.childOptions?.length > 0 && (
                          <IconButton>
                            {expandedSub[sub.id] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                    <Collapse className="bg-white" in={expandedSub[sub.id]}>
                      <List dense disablePadding>
                        {!readOnly &&
                          sub.childOptions?.length > 0 &&
                          rightSearchTerm?.length == 0 && (
                            <ListItem
                              className="p-4!"
                              key={sub.id + "k"}
                              sx={{ pl: 2 }}
                            >
                              <Checkbox
                                className="p-0!"
                                checked={
                                  sub?.childOptions?.length == childCount
                                }
                                onChange={(e) =>
                                  updateSelection(
                                    activeOptionId,
                                    sub.id,
                                    null,
                                    e.target.checked
                                  )
                                }
                              />
                              <ListItemText
                                className={`${!readOnly && "ps-3!"} m-0!`}
                                primary={"All Units"}
                              />
                            </ListItem>
                          )}
                        {sub.childOptions
                          ?.filter(
                            (child) =>
                              child.name
                                .toLowerCase()
                                .includes(rightSearchTerm.toLowerCase()) ||
                              sub.name
                                .toLowerCase()
                                .includes(rightSearchTerm.toLowerCase())
                          )
                          .map((child) => (
                            <ListItem
                              className="p-4!"
                              key={child.id}
                              sx={{ pl: 2 }}
                            >
                              {!readOnly && (
                                <Checkbox
                                  className="p-0!"
                                  checked={isChecked(
                                    activeOptionId,
                                    null,
                                    child.id
                                  )}
                                  onChange={(e) =>
                                    updateSelection(
                                      activeOptionId,
                                      null,
                                      child.id,
                                      e.target.checked
                                    )
                                  }
                                />
                              )}
                              <ListItemText
                                className={`${!readOnly && "ps-3"} m-0!`}
                                primary={child.name}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </Collapse>
                  </div>
                );
              })}
            {suboptionsFiltered?.length == 0 && (
              <NoData
                image={
                  "https://d18aratlqkym29.cloudfront.net/assets/no-block-selected.svg"
                }
                title={"No data found"}
                description={"No block or unit found with that name."}
                containerClassName={"!p-0"}
              />
            )}
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center overflow-y-auto border-t border-[#EBEBEB]">
            <NoData
              image={
                "https://d18aratlqkym29.cloudfront.net/assets/no-block-selected.svg"
              }
              title={noDataMsg?.title || "No community selected"}
              description={
                noDataMsg?.description ||
                "Select a community before choosing blocks."
              }
              containerClassName={"!p-0"}
            />
          </div>
        )}

        {!readOnly && !FromFilters && (
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
            <Box className="flex w-full bg-white justify-end gap-4 px-6 py-3">
              <Button
                variant="outlined"
                onClick={() => {
                  setSelection({});
                  onReset?.();
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onSave(convertSelectionMapToStructured(selection, dataSource))
                }
              >
                Save
              </Button>
            </Box>
          </DialogActions>
        )}
      </Box>
    </div>
  );
};
