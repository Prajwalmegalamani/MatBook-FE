import PinButton from "@/components/Buttons/pin-button";
import SecondaryButton from "@/components/Buttons/secondary-button";
import Options_Icon from "../../public/images/icons/options.svg";
import ArrowDown_Icon from "../../public/images/icons/arrow-down.svg";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StatusButton from "@/components/Buttons/status-button";
import WarningModal from "@/app/modals/modal";
interface Workflow {
  id: number;
  name: string;
  status: string;
  lastEdited: string;
  description: string;
  pinned: boolean;
  statusHistory: { status: string; time: string }[];
}

interface WorkflowItemProps {
  workflow: Workflow;
  onPin: (id: number) => void;
}

const WorkflowItem: React.FC<WorkflowItemProps> = ({ workflow, onPin }) => {
  const [status, setStatus] = useState(workflow.status);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showStatusHistory, setShowStatusHistory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toastInfo } = useToast();

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const newStatus = Math.random() > 0.5 ? "Passed" : "Failed";
      setStatus(newStatus);
      workflow.statusHistory.push({
        status: newStatus,
        time: new Date().toLocaleString(),
      });
      setIsExecuting(false);
    }, 3000);
  };

  const handleEdit = () => {
    alert(`Editing workflow ${workflow.name}`);
  };

  const handlePinClick = () => {
    onPin(workflow.id);
  };

  const toggleStatusHistory = () => {
    setShowStatusHistory(!showStatusHistory);
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{workflow.name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">#{workflow.id}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {workflow.lastEdited}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {workflow.description}
          </p>
        </td>
        <td className="px-4 py-4 border-b border-gray-200 text-sm">
          <div className="py-2 px-4 flex w-full justify-start items-center align-middle gap-4 h-fit">
            <PinButton active={workflow.pinned} onClick={handlePinClick} />
            <SecondaryButton
              text="Execute"
              onClick={() => setIsOpen(true)}
              isLoading={isExecuting || isOpen}
            />

            <SecondaryButton text="Edit" onClick={handleEdit} />
            <button
              onClick={() => {
                toastInfo("Coming soon");
              }}
            >
              <Image src={Options_Icon} alt="Options" />
            </button>
            <button
              onClick={toggleStatusHistory}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showStatusHistory ? (
                <Image
                  className="rotate-180"
                  src={ArrowDown_Icon}
                  alt="Arrow Up"
                />
              ) : (
                <Image src={ArrowDown_Icon} alt="Arrow Down" />
              )}
            </button>
          </div>
        </td>
      </tr>
      {showStatusHistory && (
        <tr>
          <td
            colSpan={6}
            className="px-5 py-3 border-b border-gray-200 bg-[#FFFAF2]"
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <div className="h-4 w-4 rounded-full bg-orange-500 mr-3"></div>
                <span className="text-sm text-gray-700 mr-3">
                  28/05 - 22:43 IST
                </span>
                <StatusButton status="Passed" />
                <button className="ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center mb-3">
                <div className="h-4 w-4 rounded-full bg-orange-500 mr-3"></div>
                <span className="text-sm text-gray-700 mr-3">
                  28/05 - 22:43 IST
                </span>
                <StatusButton status="Failed" />
                <button className="ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-orange-500 mr-3"></div>
                <span className="text-sm text-gray-700 mr-3">
                  28/05 - 22:43 IST
                </span>
                <StatusButton status="Failed" />
                <button className="ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
      <WarningModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        processName={workflow.name}
        onConfirm={handleExecute}
      />
    </>
  );
};

export default WorkflowItem;
