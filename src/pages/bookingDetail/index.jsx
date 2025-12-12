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
  LuClock,
  LuEllipsisVertical,
  LuGrid2X2,
  LuHourglass,
  LuPrinter,
  LuSquarePen,
  LuUsers,
} from "react-icons/lu";

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
      }
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
      className={`border-[#EBEBEB] ${
        thick ? "border-b-0" : "border-dashed"
      } my-4`}
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
      <div
        className="p-2 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <div className="text-2xl">{icon}</div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm" style={{ color: labelColor }}>
          {label}:
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
          bookingBreadcrumbLinks[from] && bookingBreadcrumbLinks[from],
        ]}
        backDisable={false}
      />
      <Card
        elevation={0}
        className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card
              elevation={0}
              className="border border-[#EBEBEB] rounded-lg bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[#884EA7]  items-center justify-center">
                      <LuBuilding size={26} className="text-white" />
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-semibold text-2xl text-[#121212]">
                        {data?.facilityName || "GYM"}
                      </h1>
                      <p className="text-[#4D4D4D] text-sm">
                        {data?.communityName || "Ashiana Garden"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Status label={data?.status || "Upcoming"} />

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
              </CardContent>
            </Card>

            <Card
              elevation={0}
              className="border border-[#EBEBEB] rounded-lg bg-white"
            >
              <div className="p-6">
                <h1 className="text-xl font-semibold text-[#121212]">
                  Booking Details
                </h1>
                <DividerLine thick={true} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <InfoRow icon={<LuGrid2X2 />} label="Unit" value="--" />
                  <InfoRow
                    icon={<LuCalendarPlus />}
                    label="Booking Type"
                    value="Community"
                  />
                  <InfoRow
                    icon={<LuUsers />}
                    label="Booking For"
                    value="Owner"
                  />
                  <InfoRow
                    icon={<LuBuilding />}
                    label="Community"
                    value="Ashiana Garden"
                  />
                  <InfoRow
                    icon={<LuBell />}
                    label="Booking Frequency"
                    value="Daily"
                  />
                </div>
              </div>
            </Card>
            <Card
              elevation={0}
              className="border border-[#EBEBEB] rounded-lg bg-white"
            >
              <div className="p-6">
                <h1 className="text-xl font-semibold text-[#121212]">
                  Date & Time
                </h1>
                <DividerLine thick={true} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                  <InfoRow
                    icon={<LuCalendarDays />}
                    label="Start Date"
                    value="22-December-2025"
                    iconBg="#F0FFF7" // light green
                    iconColor="#16A34A"
                  />
                  <InfoRow
                    icon={<LuHourglass />}
                    label="End Date"
                    value="27-January-2025"
                     iconBg="#FFEAEA"
                     iconColor="#AB0000"
                  />
                  <InfoRow
                    icon={<LuClock />}
                    label="Time"
                    value="07:00 - 09:00 Hrs"
                    iconBg="#EDF6FF"
                     iconColor="#329DFF"
                  />
                </div>
              </div>
            </Card>
          </div>

          <Card
            elevation={0}
            className="border border-[#EBEBEB] rounded-lg bg-white p-6"
          >
            <h1 className="text-xl font-semibold text-[#121212]">
              Amount Charged
            </h1>
            <DividerLine thick={true} />

            <div className="text-sm text-[#6B6B6B] flex justify-between mt-2">
              <span>Category</span>
              <span>Price</span>
            </div>

            <h2 className="mt-4 mb-1 font-semibold text-[#121212]">Owners</h2>

            <div className="flex justify-between py-2 border-b border-[#EBEBEB]">
              <span className="text-[#6B6B6B]">For Flat</span>
              <span className="font-medium text-[#121212]">₹ 800.00</span>
            </div>

            <div className="flex justify-between mt-4">
              <span className="font-semibold text-[#121212]">Total</span>
              <span className="font-bold text-[#121212]">₹ 800.00</span>
            </div>
          </Card>
        </div>

        <Card
          elevation={0}
          className="border border-[#EBEBEB] rounded-lg bg-white"
        >
          <div className="p-6">
            <h1 className="text-xl font-semibold text-[#121212]">
              Purpose of Booking
            </h1>
            <DividerLine thick={true} />

            <p className="mt-4 text-[#4D4D4D] text-sm leading-relaxed">
              We are booking the activity room for a kids’ party. The event will
              include children’s activities and light refreshments. The room
              will be required for the full duration of the celebration. All
              arrangements will be managed responsibly, ensuring cleanliness and
              safety. This message is for documentation of the booking purpose.
            </p>
          </div>
        </Card>
      </Card>
    </>
  );
}

export default BookingDetailPage;
