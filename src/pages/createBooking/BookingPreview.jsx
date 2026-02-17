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
import { BookOutlined, ReceiptOutlined, TextSnippetOutlined, TollOutlined } from '@mui/icons-material';
import { basePath, bookingForOptions, bookingFrequencyOptions } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg";
import DOMPurify from "dompurify";

import dayjs from "dayjs";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup";
import ActionButtons from "../../components/ui/Button/ActionButtons";
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
            <FormWrapper className="p-0! border-0!">

                {/* ================= HEADER ================= */}
                <Box className="flex justify-between items-start mb-6">
                    <Typography className="text-[28px]!" fontWeight={600}>
                        Auditorium Hall
                    </Typography>

                    <Typography className="text-sm text-[#4D4D4F]">
                        {dayjs().format("DD-MMMM-YYYY hh:mm A")}
                    </Typography>
                </Box>

                {/* ================= MAIN GRID ================= */}
                <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-5">

                    {/* -------- LEFT CONTENT -------- */}
                    <Box className="lg:col-span-8 flex flex-col gap-6">

                        {/* Booking Details */}
                        <SectionCard title="Booking Details" icon={<ReceiptOutlined />}>
                            <InfoGrid col={3}>
                                <InfoRow label="Booking Date" value={formatDate(fromDate)} />
                                <InfoRow
                                    label="Booking Time"
                                    value={startTime && endTime ? `${startTime} - ${endTime}` : "—"}
                                />
                                <InfoRow label="Booking Frequency" value={bookingFrequency?.[0] || "—"} />
                            </InfoGrid>
                        </SectionCard>

                        {/* Other Details */}
                        <SectionCard title="Other Details" icon={<BookOutlined />}>
                            <InfoGrid col={2}>
                                <InfoRow label="Unit" value="A - 1012" row />
                                <InfoRow label="Community" value="Golden Park" row />
                                <InfoRow
                                    label="Booking Type"
                                    row
                                    value={type === "personal" ? "Personal" : "Community"}
                                />
                                <InfoRow row label="Booking For" value={bookingForLabel} />
                                <InfoRow row label="Chargeable" value="No" />
                                <InfoRow row label="Booking By" value="Gaurav" />
                            </InfoGrid>
                        </SectionCard>


                    </Box>

                    {/* -------- RIGHT PANEL -------- */}
                    <Box className="lg:col-span-4">
                        <SectionCard title="Amount Charged" icon={<TollOutlined />} className={"h-full flex flex-col justify-between"}>
                            <Box className="flex flex-col justify-between h-full">
                                <Box className="flex justify-between text-sm mb-6">
                                    <span className="text-[#4D4D4F]">Facility Charges</span>
                                    <span className="font-medium">₹ 00.00</span>
                                </Box>

                                <Box className="flex justify-between font-medium border-t border-dashed border-[#EDEDED] pt-4">
                                    <span>Total</span>
                                    <span>₹ 00.00</span>
                                </Box>
                            </Box>
                        </SectionCard>
                    </Box>

                    {/* Purpose */}
                    <Box className="lg:col-span-full">

                        <SectionCard title="Purpose of Booking" icon={<TextSnippetOutlined />}>
                            <Typography className="text-sm text-[#4D4D4F] leading-6"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(purpose || "—"),
                                }}
                            >
                            </Typography>
                        </SectionCard>
                    </Box>
                </Box>

                {/* ================= FOOTER ================= */}
                <ActionButtons
                    startText="Cancel"
                    onStart={() => setCancelDialog(true)}
                    backText="Back"
                    onBack={() => navigate(-1)}
                    nextText="Book Now"
                // onNext={handleSubmit(onSubmit)}
                />




            </FormWrapper>

        </>
    );
}


/* ----------------------------------------
   Reusable Components
---------------------------------------- */

const SectionCard = ({ title, children, icon, className }) => (
    <Box className={"bg-white border border-[#EBEBEB] rounded-lg py-5 px-4" + " " + (className || "")}>
        <Box className="flex gap-3 border-b border-dashed border-[#EBEBEB] mb-4! pb-4!">
            {icon}
            <Typography className="font-medium text-[#4D4D4F] ">
                {title}
            </Typography>
        </Box>
        {children}
    </Box>
);
const InfoGrid = ({ children, col }) => (
    <Box className={`grid grid-cols-1 sm:grid-cols-${col || 2}! ${col == 2 ? "sm:gap-x-24" : "gap-x-4"}  gap-x-4 gap-y-4
                    ${col == 2 ? "sm:relative sm:after:content-[''] sm:after:absolute sm:after:top-0 sm:after:bottom-0 sm:after:left-1/2 sm:after:border-l sm:after:border-dashed sm:after:border-gray-300" : ""}
    text-sm`}>
        {children}
    </Box>
);



const InfoRow = ({ label, value, row }) => (
    <Box className={`flex ${row ? "justify-between" : "flex-col"} gap-2`}>
        <Typography className="text-[#4D4D4F] text-sm!">
            {label}:
        </Typography>
        <Typography className="text-sm! text-[#121212]">
            {value}
        </Typography>
    </Box>
);