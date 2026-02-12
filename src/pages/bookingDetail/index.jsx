import { useSearchParams } from "react-router-dom";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { basePath, bookingBreadcrumbLinks } from "../../utils";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Status from "../../components/ui/StatusColor";
import { useState } from "react";
import {
  LuBell,
  LuBuilding,
  LuCalendar,
  LuCalendarDays,
  LuCalendarPlus,
  LuClipboardList,
  LuClock,
  LuDollarSign,
  LuEllipsisVertical,
  LuFileText,
  LuGrid2X2,
  LuHourglass,
  LuPrinter,
  LuSquarePen,
  LuUsers,
} from "react-icons/lu";
import { BookMarked, Coins, FileText, ReceiptText } from "lucide-react";

function BookingDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const [expanded, setExpanded] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const actionMenu = () => {
    const temp = [];

    // ✅ Reply permission (assumed to be reply_notice)

    temp.push(
      {
        text: "Print",
        onClick: () => navigate(`${basePath}/print-notice/${idToUse}`),
        className: "!text-[#329DFF]",
        icon: <LuPrinter color="#329DFF" />,
      },
      //   {
      //   text: "Reply",
      //   onClick: () => navigate(`${basePath}/reply-on-notice/${idToUse}`),
      //   className: "!text-[#329DFF]",
      //   icon: <LuReply color="#329DFF" />,
      // }
    );

    // ✅ Edit permission

    temp.push({
      text: "Edit",
      onClick: () => navigate(`${basePath}/edit_notice/${idToUse}`),
      className: "!text-[#C4750D]",
      icon: <LuSquarePen color="#C4750D" />,
    });

    // ✅ Delete permission
    // if (permissions?.delete_notice) {
    //   temp.push({
    //     text: "Delete",
    //     onClick: () => handleDeleteClick(idToUse),
    //     className: "!text-[#4D4D4F]",
    //     icon: <LuTrash2 color="#4D4D4F" />,
    //   });
    // }

    return temp;
  };
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const DividerLine = ({ thick }) => (
    <hr
      className={`border-[#EBEBEB] ${thick ? "border-b-0" : "border-dashed"}`}
    />
  );

  //   const InfoRow = ({ src, label, value }) => (
  //     <Box className="flex justify-start gap-2 items-center">
  //       <div className="flex w-full gap-2">
  //         <IconButton className="p-0! bg-[#FBF5FF]! text-2xl! ">
  //           <img src={src} />
  //         </IconButton>
  //         <div className="flex flex-col gap-2">
  //           <span className="font-medium text-[#4D4D4D] text-sm">{label} :</span>
  //           <span className="text-right text-[#121212] font-medium">{value}</span>
  //         </div>
  //       </div>
  //     </Box>
  //   );

  const InfoRow = ({
    icon,
    label,
    value,
    labelColor = "#4D4D4D", // default label color
    valueColor = "#121212", // default value color
    iconBg = "#FBF5FF", // default icon background
    iconColor = "#884EA7", // default icon color
  }) => (
    <div className="flex items-start gap-3">
      {/* Icon Box */}
      {icon && (
        <div
          className="p-2 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <div className="text-2xl">{icon}</div>
        </div>
      )}

      {/* Text Section */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm" style={{ color: labelColor }}>
          {label}
        </span>

        <span className="font-medium" style={{ color: valueColor }}>
          {value || "--"}
        </span>
      </div>
    </div>
  );

  const data = {};
  return (
    <>
      <MetaTitle title="Booking Details" />
      <BreadCrumbCustom
        pageTitle={"Booking Details"}
        links={[
          {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
          {
            label: "Bookings",
            to: `${basePath}/bookings`,
          },
        ]}
        backDisable={false}
      />
      <Card
        elevation={0}
        className="flex flex-col gap-5 p-6 bg-white border border-[#EBEBEB] rounded-lg"
      >
        {/* Header Section */}

        <div className="">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="font-semibold text-3xl text-[#121212]">
                  {data?.facilityName || "Auditorium Hall"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Status label={data?.status || "Upcoming"} />
              <p className="text-[#4D4D4D] text-sm">
                {data?.bookingDate || "17-June-2025 02:08:25 PM"}
              </p>

              {actionMenu()?.length > 0 && (
                <>
                  <IconButton onClick={handleMenuOpen}>
                    <LuEllipsisVertical className="text-xl" />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      },
                    }}
                  >
                    {actionMenu().map((action, i) => (
                      <MenuItem
                        key={i}
                        onClick={() => {
                          action?.onClick?.();
                          handleMenuClose();
                        }}
                        sx={{
                          "&:not(:last-of-type)": {
                            borderBottom: "0.5px solid #EBEBEB",
                          },
                        }}
                        className="flex items-center gap-2"
                      >
                        {action.icon}
                        {action.text}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </div>
          </div>
        </div>
        <DividerLine />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card
              elevation={0}
              className="border border-[#EBEBEB] rounded-lg bg-white"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ReceiptText className="text-[#6B6B6B]" />
                  <h1 className="text-xl font-semibold text-[#121212]">
                    Booking Details
                  </h1>
                </div>
                <DividerLine />

                <div className="grid grid-cols-3 gap-6 mt-4">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking Date:"
                      value={data?.bookingDate || "06-Feb-2026"}
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking Time:"
                      value={data?.bookingTime || "09:00 AM - 10:00 AM"}
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking Frequency:"
                      value={data?.bookingFrequency || "One Time"}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Other Details Card */}
            <Card
              elevation={0}
              className="border border-[#EBEBEB] rounded-lg bg-white"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookMarked className="text-[#6B6B6B]" />
                  <h1 className="text-xl font-semibold text-[#121212]">
                    Other Details
                  </h1>
                </div>
                <DividerLine />

                <div className="grid grid-cols-3 gap-6 mt-4">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <InfoRow label="Unit:" value={data?.unit || "A - 1012"} />
                    <InfoRow
                      label="Chargeable"
                      value={data?.chargeable || "Yes"}
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Community:"
                      value={data?.community || "Golden Park"}
                    />
                    <InfoRow
                      label="Charges Type:"
                      value={data?.chargesType || "Flat Rate"}
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking For:"
                      value={data?.bookingFor || "Owners"}
                    />
                    <InfoRow
                      label="Due Date:"
                      value={data?.dueDate || "10-Feb-2026"}
                    />
                  </div>

                  {/* Additional Row */}
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking Type:"
                      value={data?.bookingType || "Personal"}
                    />
                  </div>
                  <div className="space-y-4">
                    <InfoRow
                      label="Booking By:"
                      value={data?.bookingBy || "Gourov"}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card
            elevation={0}
            className="border border-[#EBEBEB] rounded-lg bg-white p-6 h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <Coins className="text-[#6B6B6B]" />
              <h1 className="text-xl">Amount Charged</h1>
            </div>
            <DividerLine />
            <div className="flex justify-between flex-col">
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B6B] text-sm">
                    Facility Charges
                  </span>
                  <span className="font-medium text-[#121212">
                    ₹ {data?.facilityCharges || "8,000.00"}
                  </span>
                </div>

                <div className="flex justify-between items-center ">
                  <span className="text-[#6B6B6B] text-sm">PCGST (9.00%)</span>
                  <span className="font-medium text-[#121212]">
                    ₹ {data?.pcgst || "720.00"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B6B] text-sm">SGST (9.00%)</span>
                  <span className="font-medium text-[#121212]">
                    ₹ {data?.sgst || "720.00"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 ">
                <span className="font-semibold text-[#121212]">Total</span>
                <span className="font-bold text-[#121212] text-lg">
                  ₹ {data?.total || "9640.00"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <Card
          elevation={0}
          className="border border-[#EBEBEB] rounded-lg bg-white"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-[#6B6B6B]" />
              <h1 className="text-xl font-semibold text-[#121212]">
                Purpose of Booking
              </h1>
            </div>
            <DividerLine />

            <p className="mt-4 text-[#4D4D4D] text-sm leading-relaxed">
              {data?.purpose ||
                "We are booking the activity room for a kids' party. The event will include children's activities and light refreshments. The room will be required for the full duration of the celebration. All arrangements will be managed responsibly, ensuring cleanliness and safety. This message is for documentation of the booking purpose."}
            </p>
          </div>
        </Card>
      </Card>
    </>
  );
}

export default BookingDetailPage;
