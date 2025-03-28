import React from "react";

export default function StatusButton({ status }: { status: string }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded ${
        status === "Passed"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );
}
