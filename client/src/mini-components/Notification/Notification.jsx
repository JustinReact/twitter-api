import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { removeNotification } from "state/features/notificationSlice";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const dispatch = useDispatch();

  const { alertTypes } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (alertTypes.alertError !== "" || alertTypes.alertSuccess !== "") {
      dispatch(removeNotification());
    }
  }, [alertTypes]);

  if (alertTypes.alertError) {
    toast.error(`❌ ${alertTypes?.alertError}`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "error",
    });
  }
  if (alertTypes.alertSuccess) {
    toast.success(`✔️ ${alertTypes?.alertSuccess}`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "success",
    });
  }

  return (
    <ToastContainer
      transition={Zoom}
      position="bottom-right"
      autoClose={false}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover
    />
  );
};

export default Notification;
