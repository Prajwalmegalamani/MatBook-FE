import Chevron_Left_Icon from "../../../public/images/icons/chevron-left.svg";
import Chevron_Right_Icon from "../../../public/images/icons/chevron-right.svg";
import Image from "next/image";

interface PaginationProps {
  workflowsPerPage: number;
  totalWorkflows: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  workflowsPerPage,
  totalWorkflows,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalWorkflows / workflowsPerPage);

  const renderPageNumbers = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
                currentPage === number ? "bg-[#FEF3E9]" : ""
              }`}
            >
              {number}
            </button>
          </li>
        )
      );
    }

    return (
      <>
        <li className="page-item">
          <button
            onClick={() => paginate(1)}
            className={`hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              currentPage === 1 ? "bg-[#FEF3E9]" : ""
            }`}
          >
            1
          </button>
        </li>
        <li className="page-item">
          <button
            onClick={() => paginate(2)}
            className={`hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              currentPage === 2 ? "bg-[#FEF3E9]" : ""
            }`}
          >
            2
          </button>
        </li>
        <li className="page-item">
          <span className="px-2 text-gray-800 h-full flex flex-col justify-center items-center mb-2">
            ...
          </span>
        </li>
        <li className="page-item">
          <button
            onClick={() => paginate(totalPages)}
            className={`hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              currentPage === totalPages ? "bg-[#FEF3E9]" : ""
            }`}
          >
            {totalPages}
          </button>
        </li>
      </>
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex flex-row justify-center items-center align-middle gap-2 mt-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image src={Chevron_Left_Icon} alt="Chevron Left Icon" />
      </button>

      <ul className="flex justify-center">{renderPageNumbers()}</ul>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image src={Chevron_Right_Icon} alt="Chevron Right Icon" />
      </button>
    </nav>
  );
};

export default Pagination;
