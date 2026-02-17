import React from "react";
import { Box, Button } from "@mui/material";

const ActionButtons = ({
    cancelText = "Cancel",
    nextText = "Next",
    onCancel,
    onNext,
    cancelProps = {},
    nextProps = {},
    containerProps = {},
}) => {
    return (
        <Box
            className="flex gap-4 justify-end"
            {...containerProps} // allows overriding container props if needed
        >
            <Button
                variant="outlined"
                color="secondary"
                onClick={onCancel}
                {...cancelProps} // allows overriding button-specific props
            >
                {cancelText}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={onNext}
                {...nextProps}
            >
                {nextText}
            </Button>
        </Box>
    );
};

export default ActionButtons;
