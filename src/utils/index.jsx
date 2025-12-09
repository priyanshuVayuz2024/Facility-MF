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
    default:
      return "Facilities";
  }
};
