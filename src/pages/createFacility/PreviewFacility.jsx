import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import { FormWrapper } from "../../components/ui/wrapper/form";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import { basePath, convertDateFormat, communityOptions, categoryOptions } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg";
import Status from "../../components/ui/StatusColor";
import "react-quill-new/dist/quill.snow.css";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup";




export default function FacilityPreview() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const facilityData = useSelector((state) => state.facility);

    const [categoryPopupOpen, setCategoryPopupOpen] = React.useState(false);
    const [postedInPopupOpen, setPostedInPopupOpen] = React.useState(false);
    const [cancelDialog, setCancelDialog] = React.useState(false);

    const {
        facilityName,
        category,
        community,
        accessibleTo,
        intercom,
        instructions,
        blockedDays,
        operatingHours,
        opensAt,
        closesAt,
        fixedSlot,
        slots,
        adminApproval,
        chargeable,
        chargeTypeGroup,
        chargeCategory,
        dueDatePolicy,
        bookingQuota,
        maxBookingPerSlot,
        bookingTimeLimit,
        advanceBookingLimit,
    } = facilityData;




    const selectedPostedIn = communityOptions.filter(opt =>
        community?.includes(opt.id.toString())
    );

    const postedCount = selectedPostedIn.length;

    const postedInLabel =
        postedCount === 1
            ? selectedPostedIn[0]?.name
            : postedCount > 1
                ? `${postedCount} selected`
                : "—";



    const selectedCategories = categoryOptions.filter(opt =>
        category?.includes(opt.id.toString())
    );


    const categoryCount = selectedCategories.length;

    const categoryLabel =
        categoryCount === 1
            ? selectedCategories[0]?.name
            : categoryCount > 1
                ? `${categoryCount} selected`
                : "—";

    return (
        <>
            <FormWrapper className="flex flex-col gap-8 p-0! border-0!">
                <Box className="space-y-6">
                    <Box className="flex justify-between">
                        <Typography className="break-all" variant="h6" fontWeight={600}>
                            {facilityName || "Untitled Facility"}
                        </Typography>
                        <Box
                            className={
                                "w-full sm:w-2/5 flex justify-end items-center gap-5 text-sm text-[#4D4D4F]"
                            }
                        >
                            <Status label={"Draft"} />

                            <span>
                                {convertDateFormat(
                                    new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                )}
                            </span>
                        </Box>
                    </Box>
                    <DividerLine />
                    <Box className="grid grid-cols-4 gap-y-4">
                        <InfoRow
                            label="Category"
                            value={
                                categoryCount === 0 ? (
                                    "—"
                                ) : (
                                    <span
                                        className="text-[#884EA7] cursor-pointer font-medium"
                                        onClick={() => setCategoryPopupOpen(true)}
                                    >
                                        {categoryLabel}
                                    </span>
                                )
                            }
                        />


                        <InfoRow label="Accessible To" value={accessibleTo?.label} />
                        <InfoRow label="Intercom" value={intercom || "—"} />
                        <InfoRow
                            label="Posted In"
                            value={
                                postedCount <= 1 ? (
                                    postedInLabel
                                ) : (
                                    <span
                                        className="text-[#884EA7] cursor-pointer font-medium"
                                        onClick={() => setPostedInPopupOpen(true)}
                                    >
                                        {postedInLabel}
                                    </span>
                                )
                            }
                        />

                        <InfoRow label="Availability"
                            value={
                                blockedDays?.length == 7
                                    ? "All 7 days blocked"
                                    : blockedDays?.length > 0
                                        ? `${blockedDays.length} days blocked`
                                        : "None"
                            }
                        />
                        {fixedSlot &&
                            <InfoRow label="Slots Available" value={`${slots?.length}`} />
                        }


                        {operatingHours && (
                            <>
                                <InfoRow label="Operating Hours" value={`${opensAt} hrs- ${closesAt} hrs`} />
                            </>
                        )}

                        <InfoRow label="Approval Required" value={`${adminApproval ? "Yes" : "No"}`} />
                        <InfoRow label="Booking Quota Limit" value={`${bookingQuota || "-"}`} />
                        <InfoRow label="Booking Time Limit" value={`${bookingTimeLimit || "-"}`} />
                        <InfoRow label="Advance Booking Limit" value={`${advanceBookingLimit || "-"}`} />
                        <InfoRow label="Max Booking Per Slot" value={`${maxBookingPerSlot || "-"}`} />
                    </Box>
                    <DividerLine />


                    <Typography className="text-sm! font-bold! mb-2!">
                        General Instruction
                    </Typography>

                    <Box className="ql-editor">
                        {instructions ? parse(instructions) : "No instructions added."}
                    </Box>

                </Box>


                <SimpleSelectorPopup
                    open={categoryPopupOpen}
                    onClose={() => setCategoryPopupOpen(false)}
                    onSave={() => setCategoryPopupOpen(false)}

                    headingText="Category"
                    hideSearch={true}
                    showSelectAll={false}

                    selectionMode="checkbox"   // now supports multiple
                    readOnly={true}

                    initialSelection={category}         // array of string IDs
                    options={categoryOptions}           // [{ id, name }]
                />

                <SimpleSelectorPopup
                    open={postedInPopupOpen}
                    onClose={() => setPostedInPopupOpen(false)}
                    onSave={() => setPostedInPopupOpen(false)}

                    headingText="Posted In"
                    hideSearch={false}
                    showSelectAll={false}

                    selectionMode="checkbox"
                    readOnly={true}

                    initialSelection={community}
                    options={communityOptions}
                />


                {chargeable && (
                    <Box className="flex flex-col gap-5">
                        <ToggleResult label="Chargeable" value={chargeable} />
                        <Box className="flex">
                            <span className="w-full inline-block">
                                <InfoRow label="Charge Type Group"
                                    value={chargeTypeGroup?.label || "—"}
                                />
                            </span>
                            <span className="w-full inline-block">
                                <InfoRow label="Charge Category"
                                    value={chargeCategory?.label || "—"}
                                />
                            </span>
                            <span className="w-full inline-block">
                                <InfoRow label="Due Date Policy"
                                    value={dueDatePolicy || "—"}
                                />
                            </span>
                        </Box>
                    </Box>
                )}



                {/* -------------------- Footer Btns -------------------- */}
                <div className="flex flex-col sm:flex-row justify-between border-t border-[#EDEDED] pt-6 mt-4">
                    <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                        Cancel
                    </Button>

                    <Box className="flex gap-2">
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/create-facility/booking-rules")}
                        >
                            Back
                        </Button>
                        <Button variant="contained">
                            Publish
                        </Button>
                    </Box>
                </div>

                {/* Cancel Confirm */}
                <ConfirmDialog
                    open={cancelDialog}
                    onClose={() => setCancelDialog(false)}
                    onConfirm={() => navigate(`${basePath}/`)}
                    title="Confirm Cancellation"
                    description="Are you sure you want to cancel? Any changes will be lost."
                    cancelText="No, Keep It"
                    confirmText="Yes, Cancel"
                    confirmTextClassName="!bg-[#884EA7]"
                    icon={<img src={crossIcon} className="w-28" />}
                />

            </FormWrapper>
        </>
    );
}


/* ---------- Small Reusable Helpers ---------- */

const DividerLine = ({ thick }) => (
    <hr className={`border-[#EBEBEB] ${thick ? "border-b-0" : "border-dashed"} my-4`} />
);

const InfoRow = ({ label, value }) => (
    <Box className="flex justify-start gap-2 items-center">
        <span className="font-medium text-[#4D4D4D] text-sm">{label} :</span>
        <span className="text-right text-[#121212] font-medium">{value}</span>
    </Box>
);

const ToggleResult = ({ label, value }) => (
    value && (
        <Box className="flex items-start gap-2 text-sm">
            <span className="text-[#36AB6C] font-bold text-lg">✔</span>
            <Typography className="font-medium!">{label}</Typography>
        </Box>
    )
);
