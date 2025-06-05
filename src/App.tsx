import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import Layout from "./components/layout/Layout";
import MovieContextProvider from "./components/moviecontext/MovieContextProvider";

import NotFound from "./components/NotFound";
const Homepage = lazy(() => import("./components/Homepage"));
const Movie = lazy(() => import("./components/movielist/Movie"));
const FavouriteList = lazy(() => import("./components/FavouriteList"));
const SingleMovie = lazy(() => import("./components/movielist/SingleMovie"));

function App() {
  return (
    <BrowserRouter>
      <MovieContextProvider>
          <Routes>
            <Route  element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="movies">
                <Route path=":title" element={<Movie />} />
                <Route path="detail/:id" element={<SingleMovie />} />
              </Route>
              <Route path="favourite" element={<FavouriteList />} />
              <Route path="*" element={<NotFound msg="page not found" />}/>
            </Route>
          </Routes>
      </MovieContextProvider>
    </BrowserRouter>
  );
}

export default App;
