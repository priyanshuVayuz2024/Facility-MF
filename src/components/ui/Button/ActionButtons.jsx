import React from "react";
import { Box, Button } from "@mui/material";

const ActionButtons = ({
    // Left / Start button (optional)
    startText,
    onStart,
    startProps = {},

    // Middle / Back button (optional)
    backText,
    onBack,
    backProps = {},

    // Right primary button
    nextText = "Next",
    onNext,
    nextProps = {},

    // Optional cancel (if you still want separate cancel without using start)
    cancelText,
    onCancel,
    cancelProps = {},

    containerProps = {},
}) => {
    const hasStart = !!startText;

    return (
        <Box
            className={`flex pt-4 border-t border-[#EDEDED] ${hasStart ? "justify-between" : "justify-end"
                }`}
            {...containerProps}
        >
            {/* Start button (left side) */}
            {hasStart && (
                <Button
                    variant="outlined"
                    onClick={onStart}
                    {...startProps}
                >
                    {startText}
                </Button>
            )}

            {/* Right side buttons */}
            <Box className="flex gap-2">
                {cancelText && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onCancel}
                        {...cancelProps}
                    >
                        {cancelText}
                    </Button>
                )}

                {backText && (
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        {...backProps}
                    >
                        {backText}
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onNext}
                    {...nextProps}
                >
                    {nextText}
                </Button>
            </Box>
        </Box>
    );
};

export default ActionButtons;
