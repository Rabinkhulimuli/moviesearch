import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MovieCard, { type movieType } from "./MovieCard";
import NotFound from "../NotFound";
import Loading from "../Loading";

export default function Movie() {
  const [searchParams] = useSearchParams();
  const [movieData, setMovieData] = useState<movieType[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState({ num: 1, total: 1 });
  useEffect(() => {
    const title = searchParams.get("search");
    if (!title) return;
    const rawdata = localStorage.getItem("fav");
    const favdata = rawdata ? JSON.parse(rawdata) : [];

    const getMovieList = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?s=${encodeURIComponent(
            title
          )}&page=${pageNum}&apikey=e6d48a5`
        );
        if (!res.ok) {
          console.log("response of image is not okay");
          setError("error retriving the data ");
        }
        const data = await res.json();
        console.log("search data full ", data);
        if (data.Response === "False") {
          setError(data.Error);
        } else if (data.Response === "True") {
          const updatedData = data.Search.map((eh: movieType) => {
            const check = favdata.some(
              (eh1: movieType) => eh1.imdbID === eh.imdbID
            );
            return {
              Title: eh.Title,
              Released: eh.Year,
              Poster: eh.Poster,
              imdbId: eh.imdbID,
              active: check,
            };
          });
          setMovieData(updatedData);
          setPageNum((prev) => ({ ...prev, total: data.totalResults }));

          console.log("movie data all detail", data);
          console.log("movie data all updated movie data detail", movieData);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getMovieList();
  }, [searchParams]);
  const handleMov = async () => {
    const title = searchParams.get("search");
    if (!title) return;
    const rawdata = localStorage.getItem("fav");
    const favdata = rawdata ? JSON.parse(rawdata) : [];
    try {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${encodeURIComponent(
          title
        )}&page=${pageNum.num}&apikey=e6d48a5`
      );
      if (!res.ok) {
        console.log("response of image is not okay");
        setError("error retriving the data ");
      }
      const data = await res.json();
      console.log("search data full ", data);
      if (data.Response === "False") {
        setError(data.Error);
      } else if (data.Response === "True") {
        const updatedData = data.Search.map((eh: movieType) => {
          const check = favdata.some(
            (eh1: movieType) => eh1.imdbID === eh.imdbID
          );
          return {
            Title: eh.Title,
            Released: eh.Year,
            Poster: eh.Poster,
            imdbId: eh.imdbID,
            active: check,
          };
        });
        setMovieData(updatedData);
        setPageNum((prev) => ({ ...prev, total: data.totalResults }));

        console.log("movie data all detail", data);
        console.log("movie data all updated movie data detail", movieData);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-center py-10 bg-amber-900">
        {pageNum.total} results found
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
        {movieData ? (
          movieData.map((eh: movieType) => {
            return (
              <div key={eh.imdbID}>
                {" "}
                <MovieCard movieData={eh} activeFav={`${eh.imdbID}`} />{" "}
              </div>
            );
          })
        ) : (
          <NotFound error={error} msg="Search not found" />
        )}
      </div>
      <div className="flex gap-4 items-center justify-center my-10 pb-10">
        <button
          onClick={() => {
            setPageNum((prev) => ({
              ...prev,
              num: prev.num > 1 ? prev.num - 1 : 1,
            }));
            handleMov();
          }}
          disabled={pageNum.num == 1}
          className="cursor-pointer bg-cyan-700 px-4 py-1 rounded-lg font-semibold capitalize transition-all ease-in-out duration-500 hover:bg-cyan-900"
        >
          prev
        </button>
        <button
          onClick={() => {
            setPageNum((prev) => ({ ...prev, num: prev.num + 1 }));
            handleMov();
          }}
          disabled={pageNum.num == pageNum.total}
          className="cursor-pointer bg-cyan-700 px-4 py-1 rounded-lg font-semibold capitalize transition-all ease-in-out duration-500 hover:bg-cyan-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}
