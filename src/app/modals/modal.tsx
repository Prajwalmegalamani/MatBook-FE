import SecondaryButton from "@/components/Buttons/secondary-button";
import React from "react";

const WarningModal = ({
  isOpen,
  onClose,
  processName,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  processName: string;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-black w-full h-full opacity-50 absolute"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg font-poppins font-semibold text-sm shadow-lg w-full max-w-md overflow-hidden z-50"
      >
        <div className="pt-6 w-full">
          <div className=" px-6">
            <div className="flex justify-end ">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center mt-2 mb-6">
              <p className="text-gray-800 font-medium mb-2">
                "Are You Sure You Want To Execute The Process '{processName}'?
              </p>
              <p className="text-[#EE3425] text-xs font-normal">
                You Cannot Undo This Step
              </p>
            </div>
          </div>

          <div
            style={{
              boxShadow: "0px 0px 8px 0px #2C3E5033",
            }}
            className="flex justify-end gap-6 p-4 w-full"
          >
            <SecondaryButton text="Yes" onClick={onConfirm} />
            <SecondaryButton text="No" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
