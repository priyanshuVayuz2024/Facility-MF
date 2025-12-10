import { Chip } from "@mui/material";

const Status = ({ label }) => {
  const STATUS_STYLES = {
    Approved: {
      text: "#36AB6C",
      bg: "#F9FFFC",
    },
    active: {
      text: "#36AB6C",
      bg: "#F9FFFC",
    },
    expiring: {
      text: "#4D4D4F",
      bg: "#F0F0F0",
    },
    expired: {
      text: "#4D4D4F",
      bg: "#F0F0F0",
    },
    rejected: {
      text: "#AB0000",
      bg: "#FFF6F6",
    },
    Rejected: {
      text: "#AB0000",
      bg: "#FFF6F6",
    },
    pending: {
      text: "#F2A815",
      bg: "#FFF9EE",
    },
    Upcoming: {
      text: "#329DFF",
      bg: "#EDF6FF",
    },
  };

  const status = STATUS_STYLES[label] || {
    text: "#4D4D4F",
    bg: "#F5F5F5",
  };

  return (
    <Chip
      label={
        <div className="flex items-center gap-2">
          <span
            style={{
              backgroundColor: status.text,
            }}
            className="size-1 rounded-full inline-block"
          ></span>
          <span className="capitalize">{label}</span>
        </div>
      }
      sx={{
        backgroundColor: status.bg,
        color: status.text,
        fontWeight: 500,
        borderRadius: "40px",
        height: "30px",
        fontSize: "14px",
        px: 0.6,
      }}
    />
  );
};

export default Status;
