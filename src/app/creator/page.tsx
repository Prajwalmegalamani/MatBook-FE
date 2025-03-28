// components/WorkflowCreator.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface WorkflowStep {
  id: string;
  type: string;
  x: number;
  y: number;
}

const WorkflowCreator: React.FC = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: "start", type: "start", x: 0, y: 0 },
    { id: "end", type: "end", x: 0, y: 0 },
  ]);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasWidth = 600;
  const canvasHeight = 400;
  const stepHeight = 80; // Fixed height for each step
  const arrowHeight = 40; // Fixed height for each arrow

  useEffect(() => {
    setSteps((prevSteps) => {
      let currentY = 50; // Starting Y position
      const newSteps = prevSteps.map((step) => {
        if (step.type === "start") {
          return { ...step, x: canvasWidth / 2 - 25, y: currentY };
        }

        currentY += stepHeight + arrowHeight;

        if (step.type === "end") {
          const endY = 50 + (prevSteps.length - 2) * (stepHeight + arrowHeight);
          return {
            ...step,
            x: canvasWidth / 2 - 25,
            y: endY + stepHeight + arrowHeight,
          };
        }

        return {
          ...step,
          x: canvasWidth / 2 - 25,
          y: currentY - stepHeight - arrowHeight,
        };
      });
      return newSteps;
    });
  }, [steps.length, canvasWidth, canvasHeight, stepHeight, arrowHeight]);

  useEffect(() => {
    // Update Y positions when steps change
    setSteps((prevSteps) => {
      let currentY = 50; // Starting Y position
      const newSteps = prevSteps.map((step) => {
        if (step.type === "start") {
          return { ...step, x: canvasWidth / 2 - 25, y: currentY };
        }

        currentY += stepHeight + arrowHeight;

        if (step.type === "end") {
          const endY = 50 + (prevSteps.length - 2) * (stepHeight + arrowHeight);
          return {
            ...step,
            x: canvasWidth / 2 - 25,
            y: endY + stepHeight + arrowHeight,
          };
        }

        return {
          ...step,
          x: canvasWidth / 2 - 25,
          y: currentY - stepHeight - arrowHeight,
        };
      });
      return newSteps;
    });
  }, [steps.length, canvasWidth, canvasHeight, stepHeight, arrowHeight]);

  const addStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: type,
      x: 0,
      y: 0,
    };

    setSteps((prevSteps) => {
      let insertIndex = prevSteps.findIndex((step) => step.type === "end");
      if (insertIndex === -1) {
        insertIndex = prevSteps.length - 1;
      }
      const updatedSteps = [
        ...prevSteps.slice(0, insertIndex),
        newStep,
        ...prevSteps.slice(insertIndex),
      ];
      return updatedSteps;
    });
    setShowAddDialog(false);
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const Arrow = () => (
    <div className="relative h-10 w-6 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">
        +
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Workflow Creator</h2>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Step
        </button>
      </div>

      <div
        className="relative bg-dotted-space overflow-hidden"
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
        ref={canvasRef}
      >
        {steps.map((step, index) => (
          <div key={step.id}>
            {step.type !== "end" && index < steps.length - 1 && <Arrow />}
            <div
              className={`absolute ${
                step.type === "start"
                  ? "bg-green-500"
                  : step.type === "end"
                  ? "bg-red-500"
                  : "bg-white border border-gray-400"
              } rounded p-2`}
              style={{
                left: step.x,
                top: step.y,
                width: 50,
                textAlign: "center",
              }}
            >
              {step.type}
              {step.type !== "start" && step.type !== "end" && (
                <button
                  onClick={() => deleteStep(step.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
        Save Workflow
      </button>

      {showAddDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Add Step</h3>
            <button
              onClick={() => addStep("api")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              API Call
            </button>
            <button
              onClick={() => addStep("email")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Email
            </button>
            <button
              onClick={() => addStep("textBox")}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Text Box
            </button>
            <button
              onClick={() => setShowAddDialog(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowCreator;
