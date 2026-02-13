import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import RecursiveOptionList from "./RecursiveOptionList";

const RightPanel = ({ parent, defaultHeading, value, onChange }) => {
    if (!parent) return null;

    const rightConfig = parent.right || {};
    const heading = rightConfig.heading || defaultHeading;

    // Custom UI
    if (rightConfig.customRenderer) {
        const Custom = rightConfig.customRenderer;
        return (
            <Box width="65%" p={2}>
                {heading && (
                    <Typography variant="subtitle1" mb={1}>
                        {heading}
                    </Typography>
                )}
                <Custom value={value} onChange={onChange} />
            </Box>
        );
    }

    return (
        <Box width="65%" p={2}>

            {heading && (
                <Typography variant="subtitle1" mb={1}>
                    {heading}
                </Typography>
            )}

            {rightConfig.search && (
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Search"
                    sx={{ mb: 2 }}
                />
            )}

            <RecursiveOptionList
                options={parent.children || []}
                value={value}
                onChange={onChange}
                selectionType={rightConfig.selectionType}
            />
        </Box>
    );
};

export default RightPanel;
