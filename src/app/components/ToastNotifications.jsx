"use client";

import { ToastContainer } from "react-toastify";

const ToastNotifications = () => (
  <ToastContainer
    position="top-right"
    autoClose={2500}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
  />
);

export default ToastNotifications;