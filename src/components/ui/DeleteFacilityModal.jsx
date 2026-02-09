import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
} from "@mui/material";
import { CircleAlert } from "lucide-react";
import { LuCircleX } from "react-icons/lu";

const DeleteFacilityModal = ({ open = true, onClose }) => {
  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        Delete Facility
        <button onClick={onClose}>
          <LuCircleX size={22} />
        </button>
      </DialogTitle>

      <Divider />

      {/* Body */}
      <DialogContent>
        <div className="flex items-start gap-3 bg-yellow-100 border rounded-xl p-4">
          <CircleAlert size={22} className="text-yellow-600" />

          <div>
            <p className="font-semibold text-gray-800">
              Active Bookings Detected
            </p>

            <p className="text-sm text-gray-600">
              This facility has 3 active bookings.
            </p>
          </div>
        </div>
      </DialogContent>

      {/* Footer */}
    </Dialog>
  );
};

export default DeleteFacilityModal;
