import React from "react";
import { counts } from "../../components/dummyData";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { basePath } from "../../utils";
import ticketIcon from "../../../public/icons/ticket-checked.svg";

function BookingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const formatCount = (count) => (count == undefined ? "--" : `${count}`);
  const stats = [
    {
      label: "Active Bookings",
      count: formatCount(counts?.active_booking),
      link: `${basePath}/active_bookings`,
      icon: (
        <img src="/icons/sheet.svg" />
        // <LuFileSpreadsheet className="text-[#36AB6C] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#E7F5ED] to-[#E6F4E6]",
      color: "bg-[#E6F4E9]",
    },
    {
      label: "Upcoming Bookings",
      count: formatCount(counts?.upcoming_booking),
      link: `${basePath}/upcoming_bookings`,
      icon: (
        <img src="/icons/alarm-clock-check.svg" />
        // <LuAlarmClockCheck className="text-[#4D4D4F] h-[20px] w-[20px]" />
      ),
      color: "bg-[#EDF6FF]",
    },
    {
      label: "Rejected Bookings",
      count: formatCount(counts?.rejected_booking),
      link: `${basePath}/rejected_bookings`,
      icon: (
        <img src={ticketIcon} />
        //     // <LuTicketCheck className="text-[#AB0000] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#F5E5E5] to-[#F4E7E7]",
      color: "bg-[#F5E6E6]",
    },
    {
      label: "Pending Bookings",
      count: formatCount(counts?.pending_booking),
      link: `${basePath}/pending_bookings`,
      icon: (
        <img src="/icons/triangle-alert.svg" />
        // <LuTriangleAlert className="text-[#F27C15] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#FDEFE3] to-[#FDEEE2]",
      color: "bg-[#FCEEE2]",
    },
  ];
  return (
    <>
      {pathname.includes("active_bookings") ||
      pathname.includes("upcoming_bookings") ||
      pathname.includes("rejected_bookings") ||
      pathname.includes("pending_bookings") ? (
        <></>
      ) : (
        <div className="pt-5 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            return (
              <div
                key={item.label}
                className={`${item.color} min-h-[92px] cursor-pointer flex flex-col items-start gap-3.5 px-4 py-4 border-[0.5px] border-[#EBEBEB] rounded-xl transition-all`}
                onClick={() => {
                  const searchParams = new URLSearchParams(location.search);
                  const view = searchParams.get("view");
                  const viewParam = view ? `?view=${view}` : "";

                  {
                    item?.link && navigate(`${item.link}${viewParam}`);
                  }
                }}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <div className="text-base font-normal leading-5 text-[#4D4D4F]">
                      {item.label}
                    </div>
                  </div>
                  {item?.link && (
                    <IconButton className="p-0!">
                      <img src="/icons/arrow-right.svg" />
                      {/* <LuArrowRight className="text-[#884EA7]" /> */}
                    </IconButton>
                  )}
                </div>
                <div className="text-xl font-semibold leading-[24px]">
                  {item.count.toString().padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default BookingHeader;
