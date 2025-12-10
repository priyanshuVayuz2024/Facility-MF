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