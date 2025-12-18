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
      return "All Bookings";
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

// facility

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
