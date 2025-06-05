import { useParams } from "react-router";
import MovieSearchModel from "../MovieSearchModel";

export default function Movie() {
  const { title } = useParams();
  if (!title) return <div>try again</div>;
  return (
    <>
      <MovieSearchModel title={title} />
    </>
  );
}
