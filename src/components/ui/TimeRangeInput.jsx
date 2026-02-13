import {
    Box,
    TextField,
    Popover,
    Typography,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { AccessTime, ExpandLess, ExpandMore } from "@mui/icons-material";


function pad(v) {
    return String(v).padStart(2, "0");
}

export function TimeSelector({ value, onChange, onClose }) {
    const [hour, setHour] = useState("06");
    const [minute, setMinute] = useState("10");
    const [period, setPeriod] = useState("AM");

    // Initialize from value
    useEffect(() => {
        if (!value) return;

        const [time, p] = value.split(" ");
        if (!time || !p) return;

        const [h, m] = time.split(":");
        if (h) setHour(h);
        if (m) setMinute(m);
        if (p) setPeriod(p);
    }, [value]);

    const commit = (h = hour, m = minute, p = period) => {
        onChange(`${pad(h)}:${pad(m)} ${p}`);
    };

    // Increment / decrement
    const incHour = (d) => {
        let v = parseInt(hour, 10) + d;
        if (v > 12) v = 1;
        if (v < 1) v = 12;
        setHour(pad(v));
        commit(v, minute, period);
    };

    const incMinute = (d) => {
        let v = parseInt(minute, 10) + d;
        if (v >= 60) v = 0;
        if (v < 0) v = 59;
        setMinute(pad(v));
        commit(hour, v, period);
    };

    // Manual typing (NO auto-commit)
    const onHourInput = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
        setHour(v);
    };

    const onMinuteInput = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
        setMinute(v);
    };

    const onBlurCommit = () => {
        let h = parseInt(hour, 10);
        let m = parseInt(minute, 10);

        if (isNaN(h) || h < 1) h = 1;
        if (h > 12) h = 12;

        if (isNaN(m) || m < 0) m = 0;
        if (m > 59) m = 59;

        setHour(pad(h));
        setMinute(pad(m));
        commit(h, m, period);
    };

    return (
        <Box
            sx={{
                width: 160,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fff",
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>

                {/* HOUR */}
                <Box textAlign="center" className="flex flex-col">
                    <IconButton size="small" onClick={() => incHour(1)}>
                        <ExpandLess />
                    </IconButton>

                    <input
                        value={hour}
                        onChange={onHourInput}
                        onBlur={onBlurCommit}
                        className="w-10 text-center text-2xl outline-none"
                    />

                    <IconButton size="small" onClick={() => incHour(-1)}>
                        <ExpandMore />
                    </IconButton>
                </Box>

                <Typography variant="h5">:</Typography>

                {/* MINUTE */}
                <Box textAlign="center" className="flex flex-col">
                    <IconButton size="small" onClick={() => incMinute(1)}>
                        <ExpandLess />
                    </IconButton>

                    <input
                        value={minute}
                        onChange={onMinuteInput}
                        onBlur={onBlurCommit}
                        className="w-10 text-center text-2xl outline-none"
                    />

                    <IconButton size="small" onClick={() => incMinute(-1)}>
                        <ExpandMore />
                    </IconButton>
                </Box>
            </Box>

            {/* AM / PM */}
            <Box
                display="flex"
                mt={2}
                border="1px solid #EBEBEB"
                borderRadius={1}
                overflow="hidden"
            >
                <Button
                    fullWidth
                    variant={period === "AM" ? "contained" : "text"}
                    onClick={() => {
                        setPeriod("AM");
                        commit(hour, minute, "AM");
                    }}
                >
                    AM
                </Button>
                <Button
                    fullWidth
                    variant={period === "PM" ? "contained" : "text"}
                    onClick={() => {
                        setPeriod("PM");
                        commit(hour, minute, "PM");
                    }}
                >
                    PM
                </Button>
            </Box>
        </Box>
    );
}




















export function TimeRangeInput({ value, onChange, error, helperText }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <TextField
                value={value || ""}
                onClick={handleOpen}
                placeholder="00:00 AM"
                size="small"
                fullWidth
                error={error}
                helperText={helperText}
                slotProps={{
                    input: {
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <AccessTime sx={{ color: "#6B7280" }} />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <TimeSelector
                    value={value}
                    onChange={(val) => {
                        onChange(val);
                    }}
                    onClose={handleClose}
                />
            </Popover>
        </>
    );
}
