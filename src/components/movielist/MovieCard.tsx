import { FaRegHeart } from "react-icons/fa6";
import { useContext } from "react";
import { MovieContext } from "../moviecontext/MovieContext";
import { useNavigate } from "react-router";
export type movieType = {
  Title: string;
  Released?: string;
  Poster: string;
  imdbID: string;
  active?: boolean;
  Year?: string;
  Plot?: string;
  Writer?: string;
  Awards?: string;
  Actors?: string;
};
export default function MovieCard({
  movieData,
  activeFav,
}: {
  movieData: movieType;
  activeFav?: string;
}) {
  const { isFavourite, setIsFavourite } = useContext(MovieContext);
  const redirect = useNavigate();
  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rawData = localStorage.getItem("fav");
    let data = rawData ? JSON.parse(rawData) : [];
    const test = data.some((eh: movieType) => eh.imdbID === movieData.imdbID);
    if (!test) {
      data.push(movieData);

      setIsFavourite(!isFavourite); //just to refresh localstorage
    } else {
      data = data.filter((eh: movieType) => eh.imdbID !== movieData.imdbID);
      setIsFavourite(!isFavourite);
    }
    localStorage.setItem("fav", JSON.stringify(data));
    const rawDatas = localStorage.getItem("fav");
    const datas = rawDatas ? JSON.parse(rawDatas) : [];
    console.log("saved data  in storage", datas);
  };
  console.log("activefav", activeFav);
  console.log("moviefav", movieData.imdbID);
  return (
    <div
      onClick={() => redirect(`/movies/detail/${movieData.imdbID}`)}
      className="w-full space-y-2 cursor-pointer max-w-[190px] lg:max-w-[280px] "
    >
      <div className="rounded-lg relative">
        <img
          className="object-cover rounded-xl w-[190px] lg:w-[280px] h-[240px] md:h-[290px] lg:h-[390px]"
          src={movieData.Poster}
          alt={movieData.Title}
        />
        <FaRegHeart
          onClick={handleFavourite}
          className={`absolute top-2 right-2 transition-all ease-in-out duration-500 w-7 h-7 p-1 z-10 ${
            activeFav && activeFav === movieData.imdbID
              ? "bg-yellow-300 text-black"
              : "bg-transparent backdrop-blur-md"
          } rounded-2xl`}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-lg md:text-2xl text-nowrap max-w-[150px] md:max-w-[190px] font-semibold overflow-hidden text-ellipsis">
          {movieData.Title}{" "}
        </h2>
        <p className="text-sm md:text-[16px]">{movieData.Released} </p>
      </div>
    </div>
  );
}
