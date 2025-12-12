import {
    Box,
    Button,
    Typography,
    FormLabel
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormWrapper } from "../../components/ui/wrapper/form";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import { basePath, bookingForOptions, bookingFrequencyOptions } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg";

import dayjs from "dayjs";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup";

// -----------------------------
// Helper Formatters
// -----------------------------
const formatDate = (iso) => {
    if (!iso) return "—";
    return dayjs(iso).format("DD-MMM-YYYY"); // 14-Nov-2025
};

const formatTime = (t) => (t ? `${t} hrs` : "—");


// -----------------------------
// Main Component
// -----------------------------
export default function BookingPreview() {

    const navigate = useNavigate();
    const booking = useSelector((s) => s.booking);

    const {
        type,
        block,
        flat,
        bookingFor,
        bookingFrequency,
        fromDate,
        toDate,
        startTime,
        endTime,
        purpose,
        consent1,
        consent2,
    } = booking;

    const [cancelDialog, setCancelDialog] = React.useState(false);
    const [showBookingForPopup, setShowBookingForPopup] = React.useState(false);



    const selectedBookingFor = bookingForOptions.filter(opt =>
        bookingFor?.includes(opt.id.toString())
    );

    const selectedCount = selectedBookingFor.length;

    const bookingForLabel =
        selectedCount === 1
            ? selectedBookingFor[0]?.name
            : selectedCount > 1
                ? `${selectedCount} selected`
                : "—";

    return (
        <>
            <FormWrapper className="flex flex-col gap-8 p-0! border-0!">


                {/* ------------------ Title + Timestamp ------------------ */}
                <Box className="space-y-4 bg-white">

                    <Box className="flex justify-between items-start">
                        <Typography variant="h6" fontWeight={600}>
                            Activity Room
                        </Typography>

                        {/* timestamp */}
                        <Typography className="text-sm text-[#4D4D4F]">
                            {dayjs().format("DD-MMMM-YYYY hh:mm A")}
                        </Typography>
                    </Box>

                    {/* ------------------ Info Grid ------------------ */}
                    <Box className="grid grid-cols-1 sm:grid-cols-4 gap-y-3 text-sm">

                        <InfoRow label="Community" value="Golden Park" />

                        <InfoRow
                            label="Unit"
                            value={block?.label && flat?.label ? `${block.label} - ${flat.label}` : "—"}
                        />

                        <InfoRow
                            label="Booking Type"
                            value={type === "personal" ? "Personal" : "Community"}
                        />


                        <InfoRow
                            label="Booking For"
                            value={
                                selectedCount <= 1 ? (
                                    bookingForLabel
                                ) : (
                                    <span
                                        className="text-[#884EA7] cursor-pointer underline"
                                        onClick={() => setShowBookingForPopup(true)}
                                    >
                                        {bookingForLabel}
                                    </span>
                                )
                            }
                        />


                        <SimpleSelectorPopup
                            open={showBookingForPopup}
                            onClose={() => setShowBookingForPopup(false)}
                            onSave={() => setShowBookingForPopup(false)}

                            selectionMode="checkbox"
                            showSelectAll={false}
                            hideSearch={true}

                            headingText="Booking For"
                            selectAllText=""

                            options={bookingForOptions}
                            initialSelection={bookingFor}   // array of ids

                            readOnly={true}
                        />



                        {bookingFrequencyOptions?.filter(b => bookingFrequency?.some(bf => bf == b?.id))?.map(b => (<>
                            <InfoRow label="Booking Frequency" value={b?.name || "—"} />
                        </>))}


                        <InfoRow
                            label="Date"
                            value={
                                fromDate && toDate
                                    ? `${formatDate(fromDate)} to ${formatDate(toDate)}`
                                    : "—"
                            }
                        />

                        <InfoRow
                            label="Time"
                            value={
                                startTime && endTime
                                    ? `${startTime} hrs - ${endTime} hrs`
                                    : "—"
                            }
                        />

                    </Box>

                    {/* ------------------ Purpose Section ------------------ */}
                    <Box className="mt-6">
                        <Typography className="font-bold text-sm mb-2">
                            Purpose of Booking
                        </Typography>
                        <Typography className="text-sm leading-6 text-[#4D4D4F]">
                            {purpose || "—"}
                        </Typography>
                    </Box>

                    {/* ------------------ Consent Section ------------------ */}
                    <Box className="mt-6 space-y-6">

                        {/* Consent 1 */}
                        {consent1 && (
                            <ConsentBlock
                                title="I understand that I would be charged for the usage of this facility."
                                description="I acknowledge that using this facility involves a fee, and I fully accept the charges associated with it. I am aware that the facility is not complimentary and that payment is required as per the guidelines."
                            />
                        )}

                        {/* Consent 2 */}
                        {consent2 && (
                            <ConsentBlock
                                title={
                                    <>
                                        I have read the{" "}
                                        <span className="text-[#884EA7] underline cursor-pointer"
                                            onClick={() => window.open(`${basePath}/`, "_blank")}
                                        >
                                            Facility usage instructions
                                        </span>.
                                    </>
                                }
                                description="If this is checked, it means you agree to all the instructions."
                            />
                        )}

                    </Box>
                </Box>

                {/* ------------------ Footer Buttons ------------------ */}
                <div className="flex flex-col sm:flex-row justify-between border-t border-[#EDEDED] pt-6 mt-4">

                    <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                        Cancel
                    </Button>

                    <Box className="flex gap-2 mt-4 sm:mt-0">
                        <Button variant="outlined" onClick={() => navigate("/create-booking/confirmation")}>
                            Back
                        </Button>
                        <Button variant="contained" onClick={() => alert("Booking Submitted!")}>
                            Book Now
                        </Button>
                    </Box>
                </div>

                {/* ------------------ Cancel Dialog ------------------ */}
                <ConfirmDialog
                    open={cancelDialog}
                    onClose={() => setCancelDialog(false)}
                    onConfirm={() => navigate(`${basePath}/`)}
                    title="Confirm Cancellation"
                    description="Are you sure you want to cancel? Any changes made will be lost."
                    cancelText="No, Keep It"
                    confirmText="Yes, Cancel"
                    confirmTextClassName="!bg-[#884EA7]"
                    icon={<img src={crossIcon} className="w-28" />}
                />

            </FormWrapper>
        </>
    );
}


/* ----------------------------------------
   Reusable Components
---------------------------------------- */

const InfoRow = ({ label, value }) => (
    <Box className="flex gap-2 items-center">
        <span className="font-medium text-[#4D4D4D]">{label} :</span>
        <span className="text-[#121212] font-medium">{value}</span>
    </Box>
);

const ConsentBlock = ({ title, description }) => (
    <Box className="flex gap-3 items-start text-sm">
        <span className="text-[#36AB6C] font-bold text-lg">✔</span>
        <Box>
            <Typography className="font-medium text-[#121212]">
                {title}
            </Typography>
            <Typography className="text-[#4D4D4F] leading-5">
                {description}
            </Typography>
        </Box>
    </Box>
);
