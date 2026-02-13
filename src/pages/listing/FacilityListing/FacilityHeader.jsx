import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ticketIcon from "../../../../public/icons/ticket-unchecked.svg";
import totalFacility from "../../../../public/icons/total-facility.svg";
import { basePath } from "../../../utils";
import { counts } from "../../../components/dummyData";

function FacilityHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const formatCount = (count) => (count == undefined ? "--" : `${count}`);
  const stats = [
    {
      label: "Total Facilities",
      count: formatCount(counts?.active_booking),
      icon: (
        <img src={totalFacility} />
        // <LuFileSpreadsheet className="text-[#36AB6C] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#E7F5ED] to-[#E6F4E6]",
      color: "bg-[#EDF6FF]",
    },
    {
      label: "Active Facilities",
      count: formatCount(counts?.active_booking),
      link: `${basePath}/active_facilities`,
      icon: (
        <img src="/icons/sheet.svg" />
        // <LuFileSpreadsheet className="text-[#36AB6C] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#E7F5ED] to-[#E6F4E6]",
      color: "bg-[#E6F4E9]",
    },
    {
      label: "Suspended Facilities",
      count: formatCount(counts?.rejected_booking),
      link: `${basePath}/suspended_facilities`,
      icon: (
        <img src={ticketIcon} />
        //     // <LuTicketCheck className="text-[#AB0000] h-[20px] w-[20px]" />
      ),
      //   color: "bg-gradient-to-b from-[#F5E5E5] to-[#F4E7E7]",
      color: "bg-[#F5E6E6]",
    },
  ];

  return (
    <>
      {pathname.includes("active_facilities") ||
      pathname.includes("suspended_facilities") ? (
        <></>
      ) : (
        <div className="pt-5 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="text-xl font-semibold leading-6">
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

export default FacilityHeader;
