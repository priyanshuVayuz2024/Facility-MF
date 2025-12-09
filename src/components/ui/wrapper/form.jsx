import { Card } from "@mui/material";
import React, { forwardRef } from "react";

export const FormWrapper = forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;

  return (
    <Card
      elevation={0}
      ref={ref}
      className={`bg-white border-[0.5px] border-[#EBEBEB] rounded p-4 overflow-auto ${className}`}
      {...rest}
    >
      {children}
    </Card>
  );
});
