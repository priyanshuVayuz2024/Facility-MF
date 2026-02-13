import React from "react";
import {
    Box,
    Checkbox,
    Radio,
    Typography,
} from "@mui/material";

const RecursiveOptionList = ({
    options,
    value,
    onChange,
    selectionType,
}) => {
    const toggle = (id) => {
        if (selectionType === "readonly") return;

        if (selectionType === "checkbox") {
            const updated = { ...value };
            updated[id] ? delete updated[id] : (updated[id] = true);
            onChange(updated);
        }

        if (selectionType === "radio") {
            onChange({ [id]: true });
        }
    };

    return options.map(option => (
        <Box key={option.id} display="flex" alignItems="center">
            {selectionType === "checkbox" && (
                <Checkbox
                    checked={!!value[option.id]}
                    onChange={() => toggle(option.id)}
                />
            )}

            {selectionType === "radio" && (
                <Radio
                    checked={!!value[option.id]}
                    onChange={() => toggle(option.id)}
                />
            )}

            <span>{option.label}</span>
        </Box>
    ));
};


export default RecursiveOptionList;
