import React from "react";
import { Toaster } from "react-hot-toast"; 
const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#fff",
          color: "#1b1f52",
          padding: "12px 18px",
          fontSize: "15px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        },
        success: {
          iconTheme: {
            primary: "#1b1f52",
            secondary: "white",
          },
        },
        error: {
          style: {
            background: "#c62828",
            color: "#ffff",
          },
          iconTheme: {
            primary: "#c62828 ",
            secondary: "white",
          },
        },
      }}
    />
  );
};
 
export default CustomToaster;