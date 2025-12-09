import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { FormWrapper } from "../../components/ui/wrapper/form";
import { MyEditor } from "../../components/MyEditor.jsx";

export default function BasicDetails() {
    const navigate = useNavigate();

    // UI-only controlled states
    const [facilityName, setFacilityName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [category, setCategory] = useState(null);
    const [community, setCommunity] = useState(null);
    const [accessibleTo, setAccessibleTo] = useState(null);
    const [intercom, setIntercom] = useState("");

    const categoryOptions = [
        { label: "Gym" },
        { label: "Swimming Pool" },
        { label: "Club House" },
    ];
    const communityOptions = [
        { label: "Community A" },
        { label: "Community B" },
    ];
    const accessibleOptions = [
        { label: "Members Only" },
        { label: "Guests Allowed" },
    ];

    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto!">

            {/* Name Of Facility */}
            <Box className="flex flex-col gap-2 relative">
                <FormLabel className="formLabels" required>
                    Name Of Facility
                </FormLabel>
                <TextField
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="Enter facility name"
                />
                <span className={`absolute right-2 top-9 text-[14px] px-4 py-1 bg-[#FAFAFA] 
                    ${facilityName?.length >= 100 ? "text-[#AB0000]" : "text-[#ADADAD]"}`}>
                    {facilityName?.length} / 100
                </span>
            </Box>

            {/* Facility Category */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Facility Category</FormLabel>
                <Autocomplete
                    options={categoryOptions}
                    value={category}
                    onChange={(_, v) => setCategory(v)}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Choose category" />
                    )}
                />
            </FormControl>

            {/* Choose Community */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Choose Community</FormLabel>
                <Autocomplete
                    options={communityOptions}
                    value={community}
                    onChange={(_, v) => setCommunity(v)}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Choose community" />
                    )}
                />
            </FormControl>

            {/* Accessible To */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Accessible To</FormLabel>
                <Autocomplete
                    options={accessibleOptions}
                    value={accessibleTo}
                    onChange={(_, v) => setAccessibleTo(v)}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Choose access level" />
                    )}
                />
            </FormControl>

            {/* Intercom Number */}
            <Box className="flex flex-col gap-2">
                <FormLabel className="formLabels">Intercom Number</FormLabel>
                <TextField
                    value={intercom}
                    onChange={(e) => setIntercom(e.target.value)}
                    placeholder="Enter intercom number"
                />
            </Box>

            {/* Instructions */}
            <Box className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Instructions</FormLabel>
                <MyEditor
                    value={instructions}
                    setValue={setInstructions}
                    placeholder="Enter instruction here"
                />
                <div className="text-right text-xs text-[#ADADAD]">
                    {instructions?.length || 0} / 3000
                </div>
            </Box>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#EDEDED]">
                <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate("/create-facility/time-availability")}
                >
                    Next
                </Button>
            </div>
        </FormWrapper>
    );
}
