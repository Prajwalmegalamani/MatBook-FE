import Search_Icon from "../../../public/images/icons/search.svg";
import Image from "next/image";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="flex flex-row justify-center items-center align-middle gap-2 relative">
      <input
        type="text"
        placeholder="Search"
        className="max-w-[340px] w-full rounded-sm px-2 py-1 text-sm font-poppins font-normal text-[#221F20] border border-[#E0E0E0] pr-6"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Image
        src={Search_Icon}
        alt="Search Icon"
        className="w-4 h-4 absolute right-2"
      />
    </div>
  );
};

export default SearchBar;
