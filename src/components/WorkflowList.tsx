import WorkflowItem from "./WorkflowItem";

interface Workflow {
  id: number;
  name: string;
  status: string;
  lastEdited: string;
  description: string;
  pinned: boolean;
  statusHistory: { status: string; time: string }[];
}

interface WorkflowListProps {
  workflows: Workflow[];
  onPin: (id: number) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ workflows, onPin }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden w-full">
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Workflow Name
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Last Edited On
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {workflows.map((workflow) => (
            <WorkflowItem key={workflow.id} workflow={workflow} onPin={onPin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowList;
