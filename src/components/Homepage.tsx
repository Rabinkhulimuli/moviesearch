import { useState } from "react";
import { useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import MovieSearchModel from "./MovieSearchModel";

function Homepage() {
  const [search, setSearch] = useState("");
  const redirect = useNavigate();
  const handleSearch = async () => {
    redirect(`/movies?title=${encodeURIComponent(search)}`);
  };
  return (
    <div>
      <div className="">
        <div className="relative">
          <img
            className="absolute  h-full  w-full max-h-screen object-cover"
            src="/homepage/movieposter.webp"
            alt="movieposter"
          />
          <div className="top-0 z-10 h-160 md:h-170 max-h-screen relative inset-0 bg-black/50 capitalize  flex flex-col items-center justify-center gap-4">
            <p className="text-2xl md:text-[4rem] font-semibold">
              Search movies
            </p>
            <div className="focus:ring-2 focus:ring-amber-200">
              <form
                onSubmit={handleSearch}
                className="flex text-lg bg-gray-700 border w-fit gap-4 items-center rounded-md px-2 py-1"
              >
                <input
                  className="outline-0 w-62 px-2 py-2 md:w-120 focus:ring-2 rounded-md focus:ring-amber-200"
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for movies.eg. Captain America"
                />
                <button type="submit" className="flex items-center">
                  <CiSearch className="w-6 h-6 cursor-pointer transition-transform ease-in-out duration-500 hover:scale-150 " />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className=" w-full text-center font-semibold text-3xl py-14">
            Watch our ten Action Movies
          </h2>
          <div>
            <MovieSearchModel title="action" />
          </div>
        </div>
        <div>
          <h2 className=" w-full text-center font-semibold text-3xl py-12">
            Watch our ten comedy Movies
          </h2>
          <div>
            <MovieSearchModel title="comedy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
