import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";
export default function Searchbar() {
  const [search, setSearch] = useState("");
  const location= useLocation()
    const redirect= useNavigate()
  const handleSearch = async () => {
        redirect(`/movies/${search}`)
  };
  return (
    <div >
      <form onSubmit={handleSearch} className={`flex text-lg bg-gray-700 border-2 w-fit gap-4 items-center rounded-md px-2 py-1 ${location.pathname.includes("/movies")?"border-cyan-400":"border-white"}`}>
        <input
          className="outline-0 w-28 md:w-52 lg:w-64"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit" className="flex items-center">
          <CiSearch className="w-6 h-6 cursor-pointer " />
        </button>
      </form>
    </div>
  );
}
