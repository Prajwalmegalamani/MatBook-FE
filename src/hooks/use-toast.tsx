"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/utils";

export interface IToastContext {
  toastSuccess: (message: React.ReactNode) => void;
  toastError: (message: string) => void;
  toastInfo: (message: string) => void;
  toastWarning: (message: string) => void;
  toastCustom: (message: string, type: string, duration?: number) => void;
  clearAllToasts: () => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: React.ReactNode;
      type: string;
      animateOut: boolean;
    }[]
  >([]);

  const addToast = (
    message: React.ReactNode,
    type: string,
    duration = 1500
  ) => {
    if (message === null || message === undefined || message === "") return;

    const id = Date.now();
    setToasts((prev) => {
      // check if the message is already in the toasts
      const existingToast = prev.find((toast) => toast.message === message);
      if (existingToast) {
        return prev;
      } else {
        return [...prev, { id, message, type, animateOut: false }];
      }
    });

    // Start slide out before removal
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, animateOut: true } : toast
        )
      );
      setTimeout(() => {
        removeToast(id);
      }, 500); // Time for the slide-up animation
    }, duration);
  };

  // Update route change handling for App Router
  useEffect(() => {
    const handleRouteChange = () => {
      clearAllToasts();
    };

    // Listen to pathname changes
    const pathname = window.location.pathname;
    let lastPathname = pathname;

    const intervalId = setInterval(() => {
      const currentPathname = window.location.pathname;
      if (currentPathname !== lastPathname) {
        handleRouteChange();
        lastPathname = currentPathname;
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toastSuccess = (message: React.ReactNode) => {
    addToast(message, "success");
  };

  const toastError = (message: string) => {
    addToast(capitalizeFirstLetter(message), "error");
  };

  const toastInfo = (message: string) => {
    addToast(capitalizeFirstLetter(message), "info");
  };

  const toastWarning = (message: string) => {
    addToast(capitalizeFirstLetter(message), "warning");
  };

  const toastCustom = (message: string, type: string, duration = 1500) => {
    addToast(capitalizeFirstLetter(message), type, duration);
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const toastFunctions: IToastContext = {
    toastSuccess,
    toastError,
    toastInfo,
    toastWarning,
    toastCustom,
    clearAllToasts,
  };

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#ffffff",
          color: "white",
        };
      case "error":
        return {
          backgroundColor: "#dc3545",
          color: "white",
        };
      case "info":
        return {
          backgroundColor: "#17a2b8",
          color: "white",
        };
      case "warning":
        return {
          backgroundColor: "#ffc107",
          color: "black",
        };
      default:
        return {
          backgroundColor: "#333",
          color: "white",
        };
    }
  };

  const toastStyle = {
    minWidth: "300px",
    padding: "12px 16px",
    fontWeight: 400,
    borderRadius: "12px",
    fontSize: "14px",
    opacity: 1,
    transition: "opacity 0.5s ease, transform 0.5s ease",
    boxShadow: "0px 4px 24px 0px #00000014",
  };

  return (
    <ToastContext.Provider value={toastFunctions}>
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column" as const,
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#10B981",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...toastStyle,
              ...getToastStyles(toast.type),
              animation: toast.animateOut
                ? "slideOut 0.5s forwards"
                : "slideIn 0.5s forwards",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};
