// import React, { useState, useMemo } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   Box,
//   Button,
//   Divider,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import LeftPanel from "./LeftPanel";
// import RightPanel from "./RightPanel";

// const FilterPopup = ({ open, onClose, config, value, onChange }) => {
//   const [activeParentId, setActiveParentId] = useState(null);

//   const activeParent = useMemo(
//     () => config.parents.find((p) => p.id === activeParentId),
//     [activeParentId, config.parents],
//   );

//   const isSinglePanel =
//     config.layout?.singlePanel ||
//     !config.parents.some((p) => p.children || p.right?.customRenderer);

//   const parentValue = value.parents?.[activeParentId] || {};

//   const updateParentValue = (updated) => {
//     onChange({
//       ...value,
//       parents: {
//         ...value.parents,
//         [activeParentId]: updated,
//       },
//     });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="100%" fullWidth>
//       <DialogContent
//         className="p-0! rounded-lg! relative overflow-hidden!"
//         sx={{
//           height: "85vh",
//           maxHeight: "85vh",
//         }}
//       >
//         <Box className="flex flex-col md:flex-row overflow-hidden h-full">
//           {/* ================= LEFT PANEL ================= */}
//           <Box
//             className="flex flex-col border-r border-[#EBEBEB]"
//             sx={{
//               width: isSinglePanel ? "100%" : { md: "33.33%" },
//             }}
//           >
//             {/* Sticky Header */}
//             <DialogTitle
//               sx={{
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 2,
//                 padding: 0,
//                 backgroundColor: "white",
//                 borderBottom: "1px solid #EBEBEB",
//               }}
//             >
//               <Box className="flex justify-between items-center">
//                 <Typography className="px-6 py-4 font-semibold! text-base! text-[#4D4D4F]">
//                   {config.left.heading}
//                 </Typography>
//               </Box>
//             </DialogTitle>

//             {/* Scrollable Content */}
//             <Box className="overflow-y-auto">
//               <LeftPanel
//                 singlePanel={isSinglePanel}
//                 parents={config.parents}
//                 heading={null}
//                 activeParentId={activeParentId}
//                 setActiveParentId={setActiveParentId}
//                 value={value.parents || {}}
//                 onChange={(parents) => onChange({ ...value, parents })}
//                 searchEnabled={config.left.search}
//                 selectionType={config.left.selectionType}
//               />
//             </Box>
//           </Box>

//           <DialogActions
//             sx={{
//               position: "sticky",
//               bottom: 0,
//               zIndex: 2,
//               backgroundColor: "white",
//               borderTop: "1px solid #EBEBEB",
//               padding: 0,
//             }}
//           >
//             <Box className="flex w-full justify-end gap-4 px-6 py-3">
//               <Button
//                 variant="outlined"
//                 onClick={() => onChange({ parents: {} })}
//               >
//                 Reset
//               </Button>
//               <Button variant="contained" onClick={onClose}>
//                 Apply
//               </Button>
//             </Box>
//           </DialogActions>

//           {/* ================= RIGHT PANEL ================= */}
//           {!isSinglePanel && (
//             <Box className="md:w-2/3 flex flex-col">
//               {/* Sticky Header */}
//               <DialogTitle
//                 sx={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 2,
//                   padding: 0,
//                   backgroundColor: "white",
//                   borderBottom: "1px solid #EBEBEB",
//                 }}
//               >
//                 <Box className="flex justify-between items-center">
//                   <Typography className="px-6 py-4 font-semibold! text-base! text-[#4D4D4F]">
//                     {activeParent?.right?.heading || config.right.heading}
//                   </Typography>

//                   <IconButton
//                     onClick={onClose}
//                     className="mr-2 hidden md:block!"
//                   >
//                     <CloseIcon />
//                   </IconButton>
//                 </Box>
//               </DialogTitle>

//               {/* Scrollable Body */}
//               <Box className="flex-1 overflow-y-auto">
//                 {activeParent ? (
//                   <RightPanel
//                     parent={activeParent}
//                     defaultHeading={null}
//                     value={parentValue}
//                     onChange={updateParentValue}
//                   />
//                 ) : (
//                   <Box className="flex h-full justify-center items-center">
//                     <Typography color="text.secondary">
//                       No option selected
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               {/* Sticky Footer */}
//             </Box>
//           )}
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FilterPopup;

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const FilterPopup = ({ open, onClose, config, value, onChange }) => {
  const [activeParentId, setActiveParentId] = useState(null);

  const activeParent = useMemo(
    () => config.parents.find((p) => p.id === activeParentId),
    [activeParentId, config.parents],
  );

  const isSinglePanel =
    config.layout?.singlePanel ||
    !config.parents.some((p) => p.children || p.right?.customRenderer);

  const parentValue = value.parents?.[activeParentId] || {};

  const updateParentValue = (updated) => {
    onChange({
      ...value,
      parents: {
        ...value.parents,
        [activeParentId]: updated,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="100%" fullWidth>
      <DialogContent
        className="p-0! rounded-lg! relative overflow-hidden!"
        sx={{
          height: "85vh",
          maxHeight: "85vh",
        }}
      >
        <Box className="flex flex-col md:flex-row overflow-hidden h-full">
          {/* ================= LEFT PANEL ================= */}
          <Box
            className="flex flex-col border-r border-[#EBEBEB]"
            sx={{
              width: isSinglePanel ? "100%" : { md: "33.33%" },
              minHeight: 0,
              flex: isSinglePanel ? 1 : "none",
              overflow: "hidden",
            }}
          >
            {/* Sticky Header */}
            <DialogTitle
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                padding: 0,
                backgroundColor: "white",
                borderBottom: "1px solid #EBEBEB",
                flexShrink: 0,
              }}
            >
              <Box className="flex justify-between items-center">
                <Typography className="px-6 py-4 font-semibold! text-base! text-[#4D4D4F]">
                  {config.left.heading}
                </Typography>

                {/* Only show close button on single panel */}
                {isSinglePanel && (
                  <IconButton onClick={onClose} className="mr-2!">
                    <CancelOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            </DialogTitle>

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
              <LeftPanel
                singlePanel={isSinglePanel}
                parents={config.parents}
                heading={null}
                activeParentId={activeParentId}
                setActiveParentId={setActiveParentId}
                value={value.parents || {}}
                onChange={(parents) => onChange({ ...value, parents })}
                searchEnabled={config.left.search}
                selectionType={config.left.selectionType}
              />
            </Box>

            {/* Footer for Single Panel */}
            {isSinglePanel && (
              <DialogActions
                sx={{
                  backgroundColor: "white",
                  borderTop: "1px solid #EBEBEB",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <Box className="flex w-full justify-end gap-4 px-6 py-3">
                  <Button
                    variant="outlined"
                    onClick={() => onChange({ parents: {} })}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" onClick={onClose}>
                    Save
                  </Button>
                </Box>
              </DialogActions>
            )}
          </Box>

          {/* ================= RIGHT PANEL ================= */}
          {!isSinglePanel && (
            <Box
              className="md:w-2/3 flex flex-col"
              sx={{ minHeight: 0, flex: 1, overflow: "hidden" }}
            >
              {/* Sticky Header */}
              <DialogTitle
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                  padding: 0,
                  backgroundColor: "white",
                  borderBottom: "1px solid #EBEBEB",
                  flexShrink: 0,
                }}
              >
                <Box className="flex justify-between items-center">
                  <Typography className="px-6 py-4 font-semibold! text-base! text-[#4D4D4F]">
                    {activeParent?.right?.heading || config.right.heading}
                  </Typography>

                  {/* Only show close button on dual panel (in right panel header) */}
                  <IconButton onClick={onClose} className="mr-2!">
                    <CancelOutlinedIcon sx={{ color: "#121212" }} />{" "}
                  </IconButton>
                </Box>
              </DialogTitle>

              {/* Scrollable Body */}
              <Box sx={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                {activeParent ? (
                  <RightPanel
                    parent={activeParent}
                    defaultHeading={null}
                    value={parentValue}
                    onChange={updateParentValue}

                  />
                ) : (
                  <Box className="flex h-full justify-center items-center">
                    <Typography color="text.secondary">
                      No option selected
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Footer for Dual Panel */}
              <DialogActions
                sx={{
                  backgroundColor: "white",
                  borderTop: "1px solid #EBEBEB",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <Box className="flex w-full justify-end gap-4 px-6 py-3">
                  <Button
                    variant="outlined"
                    onClick={() => onChange({ parents: {} })}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" onClick={onClose}>
                    Save
                  </Button>
                </Box>
              </DialogActions>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;
