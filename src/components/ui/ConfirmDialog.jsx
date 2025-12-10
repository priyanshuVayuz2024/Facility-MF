import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import Lottie from "lottie-react";

const ConfirmDialog = ({
  width,
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmText,
  cancelText,
  icon = <img src="https://d18aratlqkym29.cloudfront.net/assets/success.svg" />,
  animation,
  color = "error",
  cancelTextClassName,
  confirmTextClassName,
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: width ? width : "488px",
          maxWidth: "none",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {animation ? (
        <DialogTitle textAlign="center">
          <div className="flex justify-center items-center">
            <Lottie
              className="w-[120px] h-[120px]"
              animationData={animation}
              loop={true}
            />
          </div>
        </DialogTitle>
      ) : (
        <DialogTitle textAlign="center">
          <div className="flex justify-center items-center">{icon}</div>
        </DialogTitle>
      )}
      <DialogContent Content className="flex flex-col gap-3">
        <h4
          className="text-[28px]! font-medium! !text[#121212] leading-8!"
          align="center"
        >
          {title}
        </h4>
        <DialogContentText
          className="text-[#4D4D4F]! leading-5!"
          align="center"
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4! flex justify-end gap-2">
        {cancelText && (
          <Button
            className={`${
              cancelTextClassName
                ? cancelTextClassName
                : "bg-[#EBEBEB]! text-[#121212]!"
            } px-6! py-3! leading-4!`}
            disabled={loading}
            onClick={onClose}
          >
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button
            className={`${
              confirmTextClassName ? confirmTextClassName : "bg-[#AB0000]!"
            } px-6! py-3! leading-4!`}
            disabled={loading}
            onClick={onConfirm}
            color={color}
            variant="contained"
            loading={confirmTextClassName ? loading : false}
          >
            {!confirmTextClassName ? (
              loading ? (
                <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
              ) : (
                confirmText
              )
            ) : (
              confirmText
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

function breakSentencesToLines(text) {
  const sentences = text
    .split(/(?<=[.?!])\s+/) // Splits on punctuation + space
    .filter(Boolean); // Remove empty entries

  return sentences.map((sentence, index) => (
    <span key={index} className="block">
      {sentence}
    </span>
  ));
}
