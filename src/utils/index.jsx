
export const basePath = localStorage?.getItem("facilitesMF") || "";

export const getPageTitle = (pathname) => {
  switch (true) {
    case pathname.includes("active_bookings"):
      return "Active Bookings";
    case pathname.includes("upcoming_bookings"):
      return "Upcoming Bookings";
    case pathname.includes("rejected_bookings"):
      return "Rejected Bookings";
    case pathname.includes("pending_bookings"):
      return "Pending Bookings";
    case pathname.includes("bookings"):
      return "Bookings";
    case pathname.includes("active_facilities"):
      return "Active Facilities";
    case pathname.includes("suspended_facilities"):
      return "Suspended Facilities";
    default:
      return "Facilities";
  }
};
export const uploadDocuments = async (files) => {
  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("files", file); // 'files[]' matches the backend expectation
  //   });
  //   try {
  //     const response = await tryCatch(() =>
  //       axios.post("/api/upload-image", formData, {
  //         headers: {
  //           // "Content-Type": "multipart/form-data",
  //           authorization: `Bearer ${getToken()}`, // hardcoded token
  //         },
  //       })
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("File upload failed:", error);
  //     throw error;
  //   }
};

export const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.trim();
};

// Weekdays
export const weekDaysOptions = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

export function convertDateFormat(dateStr) {
  if (!dateStr) return null;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [day, month, year] = dateStr.split("/");

  const monthName = months[parseInt(month, 10) - 1];

  return `${day}-${monthName}-${year}`;
}

// booking

export const bookingFrequencyOptions = [
  { id: 1, name: "One Time" },
  { id: 2, name: "Daily" },
  { id: 3, name: "Weekly" },
];

export const bookingForOptions = [
  { id: 1, name: "Owners" },
  { id: 2, name: "Guests Of Owner" },
  { id: 3, name: "Tenants" },
  { id: 4, name: "Guests Of Tenants" },
  { id: 5, name: "Third Party Vendors" },
  { id: 6, name: "Faculty" },
];
export const facilityOptions = [
  { id: 1, name: "Gym" },
  { id: 2, name: "Park" },
  { id: 3, name: "Auditorium" },
  { id: 4, name: "Community Hall" },
  { id: 5, name: "Parking" },
  { id: 6, name: "Badminton Court" },
];

// facility
export const chargeTypeGroupOptions = [
  { id: 1, name: "Prepaid" },
  { id: 2, name: "Flat Rate" },
  { id: 3, name: "Included With Maintenance" },
  { id: 4, name: "Pay at Use" },
  { id: 5, name: "Subscription " },
];


export const chargeTypeOptions = [
  { id: 1, name: "Flat Rate" },
  { id: 2, name: "Metered Hourly Rate" },
  { id: 3, name: "Metered Daily Rate" },
];


export const chargeFacilityCategoryOptions = [
  { id: 1, name: "Facility Usage" },
  { id: 2, name: "Subscription / Membership" },
  { id: 3, name: "Flat Rate Usage" },
  { id: 4, name: "Deposit / Security" },
  { id: 5, name: "Penalty / Fine" },


];


export const categoryOptions = [
  { id: 1, name: "Gym" },
  { id: 2, name: "Swimming Pool" },
  { id: 3, name: "Club House" },
];

export const communityOptions = [
  { id: 1, name: "Community A" },
  { id: 2, name: "Community B" },
];
export const capitalize = (str) => {
  if (typeof str == "string") {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  } else {
    return str;
  }
};

export const bookingBreadcrumbLinks = {
  upcoming: {
    label: "Upcoming Bookings",
    to: `${basePath}/upcoming_bookings`,
  },
  active: {
    label: "Active Bookings",
    to: `${basePath}/active_bookings`,
  },
  rejected: {
    label: "Rejected Bookings",
    to: `${basePath}/rejected_bookings`,
  },
  pending: {
    label: "Pending Bookings",
    to: `${basePath}/pending_bookings`,
  },
};

export const DividerLine = ({ thick }) => (
  <hr
    className={`border-[#EBEBEB] ${thick ? "border-b-0" : "border-dashed"
      } my-4`}
  />
);



export const stepperCSS = (theme) => ({
  width: "fit-content",
  paddingX: "4px",
  paddingTop: "16px",
  paddingBottom: "32px",
  "& .MuiStep-root": {
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  "& .MuiStepIcon-root": {
    color: "#EBEBEB",
    "&.Mui-completed": {
      color: "#4caf50",
    },
    "&.Mui-active": {
      // backgroundColor: "#FBF5FF",
      color: "#FBF5FF",
      border: "1px solid #884EA7",
      borderRadius: "50%",
    },
  },
  "& .MuiStepLabel-label": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#ADADAD",
    "&.Mui-active": {
      color: "#884EA7",
      fontWeight: "600",
    },
    "&.Mui-completed": {
      color: "#121212",
      fontWeight: "500",
    },
  },
  "& .MuiStepLabel-iconContainer": {
    paddingRight: "12px",
  },
  "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
    color: "#884EA7",
    fill: "#884EA7",
    fontWeight: 500,
  },
  "& .MuiStepIcon-root.Mui-active.Mui-completed": {
    color: "#4caf50 !important",
    border: "none !important",
    fontWeight: 500,
  },

  "& .MuiStepIcon-text": {
    // color: "#884EA7",
    fill: "#ADADAD",
  },
  "& .MuiStepConnector-lineHorizontal": {
    width: "4px",

    [theme.breakpoints.up("sm")]: {
      width: "90px",
    },

    [theme.breakpoints.up("md")]: {
      width: "121px",
    },
  },
})