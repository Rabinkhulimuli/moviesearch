import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loading";
import MovieCard, { type movieType } from "./MovieCard";
import NotFound from "../NotFound";
import { MovieContext } from "../moviecontext/MovieContext";

export default function SingleMovie() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [movieData, setMovieData] = useState<movieType>();
  const Apikey = import.meta.env.VITE_APIKEY;
  const { id } = useParams();

  const { isFavourite } = useContext(MovieContext);
  useEffect(() => {
    if(!id) return
    const rawdata = localStorage.getItem("fav");
    const favdata = rawdata ? JSON.parse(rawdata) : [];
    const test = favdata.some((eh: movieType) => eh.imdbID === id);
    setActive(test);
  }, [id,isFavourite]);
  useEffect(() => {
    console.log("id", id);
    if (!id) {
      return setError("movie doesnt exist");
    }
    const getMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${id}&Season&apikey=${Apikey}`
        );
        if (!res.ok) {
          setError("response not found");
        }
        const data = await res.json();
        console.log(data);
        if (data.Response == false) {
          setError(data.Error);
        }
        if (data.Response == "True") {
          setMovieData(data);
          setError("");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [id, Apikey]);
  if (loading) return <Loading />;
  if (!movieData) return <NotFound error={error} />;
  console.log("movie data", movieData);
  return (
    <div className="flex gap-4">
      <div>
        <MovieCard
          movieData={movieData}
          activeFav={active ? movieData.imdbID : ""}
        />
      </div>
      <div className="py-4">
        <div className="flex flex-col gap-1 text-justify">
        <h2>Title:{movieData?.Title} </h2>
        <p>Actor:{movieData?.Actors} </p>
        <p>Award:{movieData?.Awards} </p>
        <p>Story:{movieData?.Plot} </p>
        <p>Released:{movieData?.Released} </p>
        <p>Writer:{movieData?.Writer} </p>
      </div>
      </div>
      
    </div>
  );
}
