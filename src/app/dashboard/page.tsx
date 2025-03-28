"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkflowList from "../../components/WorkflowList";
import SearchBar from "../../components/Inputs/search-bar";
import CreateWorkflowButton from "../../components/Buttons/create-workflow-button";
import Pagination from "../../components/Lists/pagination";

interface Workflow {
  id: number;
  name: string;
  status: string;
  lastEdited: string;
  description: string;
  pinned: boolean;
  statusHistory: { status: string; time: string }[];
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [workflowsPerPage] = useState<number>(6);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dummyData: Workflow[] = [
      {
        id: 1,
        name: "Workflow Name 1",
        status: "Passed",
        lastEdited: "2024-05-28",
        description: "Description for workflow 1",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-28 10:00" },
          { status: "Passed", time: "2024-05-28 10:05" },
        ],
      },
      {
        id: 2,
        name: "Workflow Name 2",
        status: "Failed",
        lastEdited: "2024-05-27",
        description: "Description for workflow 2",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-27 11:00" },
          { status: "Failed", time: "2024-05-27 11:10" },
        ],
      },
      {
        id: 3,
        name: "Workflow Name 3",
        status: "Pending",
        lastEdited: "2024-05-26",
        description: "Description for workflow 3",
        pinned: false,
        statusHistory: [{ status: "Started", time: "2024-05-26 12:00" }],
      },
      {
        id: 4,
        name: "Workflow Name 4",
        status: "Passed",
        lastEdited: "2024-05-25",
        description: "Description for workflow 4",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-25 13:00" },
          { status: "Passed", time: "2024-05-25 13:05" },
        ],
      },
      {
        id: 5,
        name: "Workflow Name 5",
        status: "Failed",
        lastEdited: "2024-05-24",
        description: "Description for workflow 5",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-24 14:00" },
          { status: "Failed", time: "2024-05-24 14:10" },
        ],
      },
      {
        id: 6,
        name: "Workflow Name 6",
        status: "Pending",
        lastEdited: "2024-05-23",
        description: "Description for workflow 6",
        pinned: false,
        statusHistory: [{ status: "Started", time: "2024-05-23 15:00" }],
      },
      {
        id: 7,
        name: "Workflow Name 7",
        status: "Passed",
        lastEdited: "2024-05-22",
        description: "Description for workflow 7",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-22 16:00" },
          { status: "Passed", time: "2024-05-22 16:05" },
        ],
      },
      {
        id: 8,
        name: "Workflow Name 8",
        status: "Failed",
        lastEdited: "2024-05-21",
        description: "Description for workflow 8",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-21 17:00" },
          { status: "Failed", time: "2024-05-21 17:10" },
        ],
      },
      {
        id: 9,
        name: "Workflow Name 9",
        status: "Pending",
        lastEdited: "2024-05-20",
        description: "Description for workflow 9",
        pinned: false,
        statusHistory: [{ status: "Started", time: "2024-05-20 18:00" }],
      },
      {
        id: 10,
        name: "Workflow Name 10",
        status: "Passed",
        lastEdited: "2024-05-19",
        description: "Description for workflow 10",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-19 19:00" },
          { status: "Passed", time: "2024-05-19 19:05" },
        ],
      },
      {
        id: 11,
        name: "Workflow Name 11",
        status: "Passed",
        lastEdited: "2024-05-18",
        description: "Description for workflow 11",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-18 20:00" },
          { status: "Passed", time: "2024-05-18 20:05" },
        ],
      },
      {
        id: 12,
        name: "Workflow Name 12",
        status: "Passed",
        lastEdited: "2024-05-17",
        description: "Description for workflow 12",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-17 21:00" },
          { status: "Passed", time: "2024-05-17 21:05" },
        ],
      },
      {
        id: 13,
        name: "Workflow Name 13",
        status: "Passed",
        lastEdited: "2024-05-16",
        description: "Description for workflow 13",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-16 22:00" },
          { status: "Passed", time: "2024-05-16 22:05" },
        ],
      },
      {
        id: 14,
        name: "Workflow Name 14",
        status: "Passed",
        lastEdited: "2024-05-15",
        description: "Description for workflow 14",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-15 23:00" },
          { status: "Passed", time: "2024-05-15 23:05" },
        ],
      },
      {
        id: 15,
        name: "Workflow Name 15",
        status: "Passed",
        lastEdited: "2024-05-14",
        description: "Description for workflow 15",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-14 00:00" },
          { status: "Passed", time: "2024-05-14 00:05" },
        ],
      },
      {
        id: 16,
        name: "Workflow Name 16",
        status: "Passed",
        lastEdited: "2024-05-13",
        description: "Description for workflow 16",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-13 01:00" },
          { status: "Passed", time: "2024-05-13 01:05" },
        ],
      },
      {
        id: 17,
        name: "Workflow Name 17",
        status: "Passed",
        lastEdited: "2024-05-12",
        description: "Description for workflow 17",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-12 02:00" },
          { status: "Passed", time: "2024-05-12 02:05" },
        ],
      },
      {
        id: 18,
        name: "Workflow Name 18",
        status: "Passed",
        lastEdited: "2024-05-11",
        description: "Description for workflow 18",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-11 03:00" },
          { status: "Passed", time: "2024-05-11 03:05" },
        ],
      },
      {
        id: 19,
        name: "Workflow Name 19",
        status: "Passed",
        lastEdited: "2024-05-10",
        description: "Description for workflow 19",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-10 04:00" },
          { status: "Passed", time: "2024-05-10 04:05" },
        ],
      },
      {
        id: 20,
        name: "Workflow Name 20",
        status: "Passed",
        lastEdited: "2024-05-09",
        description: "Description for workflow 20",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-09 05:00" },
          { status: "Passed", time: "2024-05-09 05:05" },
        ],
      },
      {
        id: 21,
        name: "Workflow Name 21",
        status: "Passed",
        lastEdited: "2024-05-08",
        description: "Description for workflow 21",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-08 06:00" },
          { status: "Passed", time: "2024-05-08 06:05" },
        ],
      },

      {
        id: 22,
        name: "Workflow Name 22",
        status: "Passed",
        lastEdited: "2024-05-07",
        description: "Description for workflow 22",
        pinned: false,
        statusHistory: [
          { status: "Started", time: "2024-05-07 07:00" },
          { status: "Passed", time: "2024-05-07 07:05" },
        ],
      },
    ];

    sessionStorage.setItem("workflows", JSON.stringify(dummyData));
    setWorkflows(dummyData);
  };

  function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;

    return function (this: unknown, ...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleSearch = debounce((...args: unknown[]) => {
    const term = args[0] as string;
    setSearchTerm(term);
    setCurrentPage(1);
  }, 500);

  const handleCreateWorkflow = () => {
    router.push("/creator");
  };

  const handlePin = (id: number) => {
    const updatedWorkflows = workflows.map((workflow) =>
      workflow.id === id ? { ...workflow, pinned: !workflow.pinned } : workflow
    );
    setWorkflows(updatedWorkflows);
  };

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) =>
    a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1
  );

  const indexOfLastWorkflow = currentPage * workflowsPerPage;
  const indexOfFirstWorkflow = indexOfLastWorkflow - workflowsPerPage;
  const currentWorkflows = sortedWorkflows.slice(
    indexOfFirstWorkflow,
    indexOfLastWorkflow
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col justify-start items-start align-middle w-full h-full">
      <h1 className="text-2xl font-semibold text-[#221F20] font-poppins mb-8">
        Workflow Builder
      </h1>

      <div className="flex w-full items-center justify-between mb-6">
        <SearchBar onSearch={handleSearch} />
        <CreateWorkflowButton onCreate={handleCreateWorkflow} />
      </div>

      <div className="w-full flex flex-col justify-start items-start align-middle gap-6 bg-white rounded-md p-4">
        {currentWorkflows && currentWorkflows.length > 0 ? (
          <>
            <WorkflowList workflows={currentWorkflows} onPin={handlePin} />
            <div className="w-full flex flex-col justify-start items-end align-middle">
              <Pagination
                workflowsPerPage={workflowsPerPage}
                totalWorkflows={filteredWorkflows.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-start items-center align-middle">
            <p className="text-gray-500">No workflows found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
