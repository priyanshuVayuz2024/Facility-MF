import React, { useState, useEffect, useMemo } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Radio,
    Button,
    Box,
    InputAdornment,
} from "@mui/material";
import { LuX, LuCircleX } from "react-icons/lu";

const SimpleSelectorPopup = ({
    open,
    onClose,
    onSave,

    options = [],             // [{ id, name }]
    initialSelection = [],    // array of ids

    selectionMode = "checkbox",   // "checkbox" | "radio"
    showSelectAll = true,

    // 🔥 NEW GENERIC TEXT PROPS
    headingText = "Select Options",
    searchPlaceholder = "Search",
    selectAllText = "Select All",
    noResultsText = "No matching items found.",
    hideSearch = false,
    readOnly = false

}) => {
    const [selected, setSelected] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // INITIALIZE ON OPEN
    useEffect(() => {
        if (open) {
            if (selectionMode === "radio") {
                setSelected(
                    initialSelection?.length ? [initialSelection?.[0].toString()] : []
                );
            } else {
                setSelected(initialSelection?.map(String));
            }
        }
    }, [open, selectionMode]);

    // DEBOUNCED SEARCH
    useEffect(() => {
        const t = setTimeout(() => setSearchTerm(searchInput), 250);
        return () => clearTimeout(t);
    }, [searchInput]);

    const filtered = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter((o) =>
            o.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, options]);

    // CHECKED / TOGGLE LOGIC
    const isChecked = (id) => selected.includes(id.toString());

    const toggleCheckbox = (id) => {
        const strId = id.toString();
        setSelected((prev) =>
            prev.includes(strId)
                ? prev.filter((x) => x !== strId)
                : [...prev, strId]
        );
    };

    const selectRadio = (id) => setSelected([id.toString()]);

    const allSelected =
        filtered.length > 0 &&
        filtered.every((o) => selected.includes(o.id.toString()));

    const someSelected =
        filtered.some((o) => selected.includes(o.id.toString())) && !allSelected;

    const toggleSelectAll = () => {
        if (selectionMode === "radio") return;

        if (allSelected) {
            // remove only filtered rows
            setSelected((prev) =>
                prev.filter((id) => !filtered.some((o) => o.id.toString() === id))
            );
        } else {
            const ids = filtered.map((o) => o.id.toString());
            setSelected((prev) => Array.from(new Set([...prev, ...ids])));
        }
    };

    // UI
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            PaperProps={{
                sx: { borderRadius: "12px", overflow: "hidden" },
            }}
        >
            {/* HEADER */}
            <DialogTitle
                sx={{
                    padding: "20px 32px",
                    borderBottom: "1px solid #EBEBEB",
                    fontSize: "18px",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {headingText}
                <button onClick={onClose}>
                    <LuCircleX size={22} />
                </button>
            </DialogTitle>

            {/* SEARCH */}
            {!hideSearch && <Box sx={{ padding: "12px 32px", borderBottom: "1px solid #EBEBEB" }}>
                <TextField
                    fullWidth
                    placeholder={searchPlaceholder}
                    value={searchInput}
                    size="small"
                    onChange={(e) =>
                        setSearchInput(
                            e.target.value.replace(/^\s+/, "").replace(/\s{2,}/g, " ")
                        )
                    }
                    InputProps={{
                        endAdornment: searchInput && (
                            <InputAdornment position="end">
                                <button onClick={() => setSearchInput("")}>
                                    <LuX />
                                </button>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            height: "44px",
                            borderRadius: "10px",
                        },
                    }}
                />
            </Box>}

            {/* LIST */}
            <DialogContent sx={{ padding: 0, maxHeight: "55vh", overflowY: "auto" }}>
                <List disablePadding>
                    {/* SELECT ALL (checkbox mode only) */}
                    {selectionMode === "checkbox" && showSelectAll && (
                        <ListItem
                            button
                            onClick={toggleSelectAll}
                            sx={{
                                padding: "12px 24px",
                                borderBottom: "1px solid #F3F3F3",
                            }}
                        >
                            <Checkbox checked={allSelected} indeterminate={someSelected} />
                            <ListItemText primary={selectAllText} />
                        </ListItem>
                    )}

                    {filtered.map((opt) => (
                        <ListItem
                            key={opt.id}
                            button
                            sx={{
                                padding: "12px 24px",
                                borderBottom: "1px solid #F3F3F3",
                            }}
                            onClick={() => !readOnly && (selectionMode === "radio"
                                ? selectRadio(opt.id)
                                : toggleCheckbox(opt.id)
                            )}
                        >
                            {selectionMode === "checkbox" ? (
                                <Checkbox checked={isChecked(opt.id)} disabled={readOnly} />
                            ) : (
                                <Radio checked={isChecked(opt.id)} disabled={readOnly} />
                            )}

                            <ListItemText primary={opt.name} />
                        </ListItem>
                    ))}

                    {filtered.length === 0 && (
                        <Box sx={{ padding: "24px 32px", opacity: 0.6 }}>
                            {noResultsText}
                        </Box>
                    )}
                </List>
            </DialogContent>

            {/* FOOTER */}
            <DialogActions
                sx={{
                    padding: "16px 32px",
                    borderTop: "1px solid #EBEBEB",
                    background: "white",
                }}
            >
                {!readOnly && selectionMode === "checkbox" && (
                    <Button variant="outlined" onClick={() => setSelected([])}>Reset</Button>
                )}
                {!readOnly &&
                    < Button variant="contained" onClick={() => onSave(selected)}>
                        Save
                    </Button>
                }
            </DialogActions>
        </Dialog >
    );
};

export default SimpleSelectorPopup;
