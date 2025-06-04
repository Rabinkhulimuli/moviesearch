import { Link, useLocation } from "react-router";
import Searchbar from "./Searchbar";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

export default function Header() {
  const location= useLocation()
  return (
    <div className=" flex items-center px-4 justify-between text-lg py-4">
      <div>
        <Link
          to="/"
          className={` transition-all ease-in-out duration-500 font-semibold hover:text-blue-500 ${location.pathname==="/"?"text-cyan-400 ":"text-white"}`}
        >
          Homepage
        </Link>
      </div>
      <div className="flex items-center gap-4 lg:gap-12 ">
        <Searchbar />
        <Link
          to="/favourite"
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-all ease-in-out duration-500  hover:text-blue-500  ${location.pathname==="/favourite"?"text-cyan-400 ":"text-white"}`}
        >
          <BsFillBookmarkHeartFill className="w-5 h-5" />
          <span className="hidden md:block"> Favourite</span>
          
        </Link>
      </div>
    </div>
  );
}
