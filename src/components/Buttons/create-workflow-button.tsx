interface CreateWorkflowButtonProps {
  onCreate: () => void;
}

const CreateWorkflowButton: React.FC<CreateWorkflowButtonProps> = ({
  onCreate,
}) => {
  return (
    <button
      onClick={onCreate}
      className="bg-[#221F20] text-white py-2 px-3 rounded-md text-xs font-poppins font-normal"
    >
      + Create New Process
    </button>
  );
};

export default CreateWorkflowButton;
