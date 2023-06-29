import React from "react";
import Alert from "@mui/material/Alert";

const CustomAlert = ({ severity, message }) => {
  return <Alert severity={severity}>{message}</Alert>;
};

export default CustomAlert;
