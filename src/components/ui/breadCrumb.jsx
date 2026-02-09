import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LuChevronLeft } from "react-icons/lu";
import { useState } from "react";
import { basePath } from "../../utils";
import ConfirmDialog from "./ConfirmDialog";

export const BreadCrumbCustom = ({
  links = [],
  pageTitle,
  buttons,
  backLink,
  description,
  count,
  showWarning,
  backDisable,
}) => {
  const navigate = useNavigate();
  const [warningDialog, setwarningDialog] = useState(false);
  const [targetLink, setTargetLink] = useState(null); // To store the link we want to navigate to after confirmation
  if (links?.[0]?.id != "home") {
    links.unshift({
      id: "home",
      icon: <img src="/icons/home.svg" />,
      to: `${basePath}/`,
    });
  }

  // Function to handle link click
  const handleLinkClick = (to) => {
    if (showWarning) {
      // Prevent direct navigation and open confirmation dialog
      setTargetLink(to);
      setwarningDialog(true);
    } else {
      // No warning, navigate directly
      navigate(to);
    }
  };

  return (
    <>
      <Breadcrumbs
        sx={{
          lineHeight: "20px",
          "& .MuiBreadcrumbs-separator": {
            mx: "12px",
            rotate: "-6deg",
            color: "#884EA7",
          },
          "& li:nth-last-of-type(2).MuiBreadcrumbs-separator": {
            color: "#ADADAD", // override only the last visible separator
          },
          paddingBottom: "12px",
        }}
        aria-label="breadcrumb"
        separator={"/"}
      >
        {links
          .filter((data) => data !== false)
          .map(({ label, icon, to }, index) => (
            <Box
              key={index}
              component="button"
              onClick={() => handleLinkClick(to)}
              sx={{
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                color: "#884EA7",
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon} {label}
            </Box>
          ))}
        <Typography className="text-[#ADADAD] leading-5!">
          {pageTitle}
        </Typography>
      </Breadcrumbs>

      {/* Confirmation Dialog */}
      {warningDialog && (
        <ConfirmDialog
          open={warningDialog}
          onClose={() => setwarningDialog(false)}
          onConfirm={() => {
            navigate(targetLink);
            setwarningDialog(false);
          }}
          title="Are you Sure ?"
          description={showWarning}
          cancelText={"Cancel"}
          confirmText={"Yes"}
          confirmTextClassName={"!bg-[#884EA7]"}
        />
      )}
      {/* Page Title */}
      <div
        className={`${
          buttons && "sticky top-[104px]"
        } bg-[#fdfdfd] z-10 pb-3 flex flex-col sm:flex-row! sm:justify-between! sm:items-center! gap-4 sm:gap-0!`}
      >
        <div className="flex items-center gap-2">
          {!backDisable &&
            links.filter((data) => data != false).length > 1 &&
            !description && (
              <IconButton
                className="p-2.5!"
                onClick={() => navigate(backLink || -1)}
              >
                <LuChevronLeft color="#4D4D4F" size={24} />
              </IconButton>
            )}
          <Typography
            className="font-semibold! text-[#4D4D4F] leading-8!"
            fontSize={28}
          >
            {pageTitle} {count && ` (${count})`}
          </Typography>
        </div>
        {buttons && buttons}
      </div>
      {description ? (
        <>
          {buttons && (
            <div className="w-full -mt-3 h-6 top-20 bg-[#fdfdfd] sticky z-5"></div>
          )}
          <p className="text-xs mb-6 font-medium text-[#ADADAD] leading-[18px]">
            {description}
          </p>
        </>
      ) : (
        <div className="w-full h-6 top-20 bg-[#fdfdfd] sticky z-5"></div>
      )}
    </>
  );
};
