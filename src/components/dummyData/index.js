export const counts = {
  active_booking: 4,
  upcoming_booking: 5,
  rejected_booking: 6,
  pending_booking: 7,
};

export const headers = [
  {
    title: "",
  },
  {
    title: "Facility Name",
  },
  {
    title: "Community",
  },
  {
    title: "Facility Category",
  },
  {
    title: "Status",
  },
  {
    title: "Intercom Number",
  },
  {
    title: "Approval Needed?",
  },
  {
    title: "Chargeable?",
  },
];

export const bookingHeaders = [
  {
    title: "", // For Checkbox
  },
  {
    title: "Facility Name",
  },
  {
    title: "Community",
  },
  {
    title: "Unit", // Added Unit as it's in the image
  },
  {
    title: "Status",
  },
  {
    title: "Start Date",
  },
  {
    title: "End Date",
  },
  {
    title: "Time Slot",
  },
  {
    title: "Chargeable?",
  },
  {
    title: "Amount Charged",
  },
  {
    title: "Usage Instruction",
  },
  {
    title: "Booking For",
  },
  {
    title: "Booked By",
  },
];

export const detailPageHeaders = [
  {
    title: "", // For Checkbox
  },
  {
    title: "Charge Type",
  },
  {
    title: "Applicable From",
  },
  {
    title: "Time Slot", // Added Unit as it's in the image
  },
  {
    title: "Owner rate(₹)",
  },
  {
    title: "Tenant rate(₹)",
  },
];

export const facilities = [
  {
    id: "id1",
    name: "Activity Room",
    community: "Kolkata Heights",
    category: "Club House",
    status: "Active",
    intercom: "400900",
    approval: "Yes",
    chargeable: "No",
  },
  {
    id: "id2",
    name: "Auditorium Hall",
    community: "Ashiana Garden",
    category: "Club House",
    status: "Active",
    intercom: "987900",
    approval: "No",
    chargeable: "No",
  },
  {
    id: "id3",
    name: "Rooftop Lounge",
    community: "Kolkata Heights",
    category: "Club House",
    status: "Active",
    intercom: "987900",
    approval: "No",
    chargeable: "Yes",
  },
  {
    id: "id4",
    name: "Fitness Center - 1",
    community: "Ashiana Garden",
    category: "GYM",
    status: "Suspend",
    intercom: "987903",
    approval: "Yes",
    chargeable: "Yes",
  },
  {
    id: "id5",
    name: "Fitness Center - 2",
    community: "Ashiana Garden",
    category: "GYM",
    status: "Active",
    intercom: "987905",
    approval: "Yes",
    chargeable: "No",
  },
];

export const bookings = [
  {
    id: "b1",
    facilityName: "Swimming Pool",
    community: "Kolkata Heights",
    unit: "Block A - 1001",
    status: "Upcoming",
    startDate: "10-December-2025",
    endDate: "13-December-2025",
    timeSlot: "06:00 hrs - 07:00 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Owners",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b2",
    facilityName: "Activity Room",
    community: "Ashiana Garden",
    unit: "Block B - 2001",
    status: "Upcoming",
    startDate: "12-December-2025",
    endDate: "12-December-2025",
    timeSlot: "07:00 hrs - 08:00 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Tenants",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b3",
    facilityName: "Auditorium Hall",
    community: "Kaimswath Heights",
    unit: "---",
    status: "Upcoming",
    startDate: "22-December-2025",
    endDate: "29-December-2025",
    timeSlot: "06:00 hrs - 07:00 hrs",
    chargeable: "Yes",
    amountCharged: "₹ 400.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Owners +3",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b4",
    facilityName: "Rooftop Lounge",
    community: "Golden Park",
    unit: "Block H - 201",
    status: "Upcoming",
    startDate: "25-December-2025",
    endDate: "12-January-2026",
    timeSlot: "02:00 hrs - 03:00 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Owners",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b5",
    facilityName: "Rooftop Lounge-2",
    community: "Riverside Garden",
    unit: "Block A - 2001",
    status: "Upcoming",
    startDate: "29-December-2025",
    endDate: "22-January-2026",
    timeSlot: "06:00 hrs - 07:00 hrs",
    chargeable: "Yes",
    amountCharged: "₹ 4,000.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Owners",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b6",
    facilityName: "Fitness Center - 1",
    community: "Ashiana Garden",
    unit: "Block B - 4001",
    status: "Upcoming",
    startDate: "12-January-2026",
    endDate: "18-January-2026",
    timeSlot: "04:30 hrs - 07:00 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Guests +2",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b7",
    facilityName: "Play Room",
    community: "Golden Park",
    unit: "Block A - 001",
    status: "Upcoming",
    startDate: "25-January-2026",
    endDate: "26-January-2026",
    timeSlot: "06:30 hrs - 07:30 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Guests of Tenants",
    bookedBy: "Priyo Katiyar",
  },
  {
    id: "b8",
    facilityName: "Activity Room",
    community: "Lakewood Resort",
    unit: "Block A - 001",
    status: "Upcoming",
    startDate: "23-February-2026",
    endDate: "25-February-2026",
    timeSlot: "15:00 hrs - 16:50 hrs",
    chargeable: "No",
    amountCharged: "00.00",
    usageInstruction: "Read Instruction",
    bookingFor: "Owners",
    bookedBy: "Priyo Katiyar",
  },
];

export const pricing = [
  {
    id: 1,
    name: "Metered Hourly Rate (Up to 10 Hours)",
    date: "14-Nov-2025",
    time: "05:00 hrs - 23:00 hrs",
    rate: "₹ 100",
    discountedRate: "₹ 100",
  },
  {
    id: 2,
    name: "Flat Rate",
    date: "14-Nov-2025",
    time: "06:00 hrs - 07:00 hrs",
    rate: "₹ 100",
    discountedRate: "₹ 100",
  },
];
